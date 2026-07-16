import { useEffect, useRef } from "react";

/**
 * GPU-accelerated animated aurora backdrop.
 * Renders a fragment shader on a WebGL2 canvas — computed entirely on the GPU
 * every frame. Palette is warm ivory/champagne/taupe to match the brand.
 *
 * Gracefully no-ops if WebGL2 is unavailable (the parent layout should already
 * have a fallback background color).
 */
export function AuroraCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      premultipliedAlpha: false,
      alpha: true,
    });
    if (!gl) return;

    const vertSrc = `#version 300 es
      in vec2 a_pos;
      out vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragSrc = `#version 300 es
      precision highp float;
      in vec2 v_uv;
      out vec4 outColor;
      uniform float u_time;
      uniform vec2 u_res;
      uniform vec2 u_mouse;

      // simplex-ish 2D noise
      vec2 hash(vec2 p){
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++){
          v += a * noise(p);
          p *= 2.02;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = v_uv;
        float aspect = u_res.x / max(u_res.y, 1.0);
        vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

        float t = u_time * 0.06;

        // Layered flowing noise field for the aurora
        vec2 q = vec2(fbm(p * 1.2 + vec2(t, -t * 0.7)),
                      fbm(p * 1.5 + vec2(-t * 0.8, t)));
        float n = fbm(p * 2.0 + q * 1.4 + t * 0.5);
        n = smoothstep(-0.2, 0.9, n);

        // Warm palette: ivory -> champagne -> taupe glow
        vec3 ivory     = vec3(0.985, 0.972, 0.945);
        vec3 champagne = vec3(0.94, 0.88, 0.78);
        vec3 taupe     = vec3(0.78, 0.68, 0.58);
        vec3 blush     = vec3(0.96, 0.88, 0.84);

        vec3 col = mix(ivory, champagne, n);
        col = mix(col, taupe, smoothstep(0.55, 0.95, n) * 0.55);
        col = mix(col, blush, smoothstep(0.2, 0.55, n) * 0.25);

        // Soft radial spotlight following mouse
        vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
        float spot = smoothstep(0.9, 0.0, length(p - m));
        col += spot * 0.06;

        // Subtle vignette
        float vig = smoothstep(1.2, 0.2, length(p));
        col *= mix(0.92, 1.0, vig);

        // Fine film grain
        float g = fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453);
        col += (g - 0.5) * 0.015;

        outColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      // ease mouse
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
