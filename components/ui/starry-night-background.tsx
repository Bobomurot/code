"use client"

import { useEffect, useRef } from "react"

const StarryNightBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    import("three").then((THREE) => {
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x0a0e27, 1)
      container.appendChild(renderer.domElement)

      // Vertex Shader
      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `

      // Fragment Shader with stars, moons, and cosmic effects
      const fragmentShader = `
        uniform float iTime;
        uniform vec2 iResolution;

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(rand(i), rand(i + vec2(1.0, 0.0)), f.x),
            mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        vec3 hash3(vec2 p) {
          vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                         dot(p, vec2(269.5, 183.3)),
                         dot(p, vec2(419.2, 371.9)));
          return fract(sin(q) * 43758.5453);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          vec3 col = vec3(0.01, 0.02, 0.08); // Deep night sky color

          // Add stars
          for (float i = 0.0; i < 100.0; i++) {
            vec2 starPos = hash3(vec2(floor(uv * 20.0 + i))).xy;
            vec2 starDist = fract(uv * 20.0 + i) - starPos;
            float starBright = 1.0 - length(starDist) * 5.0;
            starBright = max(0.0, starBright);
            starBright *= starBright;
            
            float twinkle = sin(iTime * (hash3(vec2(i)).z * 2.0 + 1.0)) * 0.5 + 0.5;
            col += vec3(1.0, 0.95, 0.8) * starBright * twinkle * 0.5;
          }

          // Add larger glowing moons
          vec2 moon1Pos = vec2(0.3, 0.7);
          float moon1Dist = length((uv - moon1Pos) * vec2(iResolution.x / iResolution.y, 1.0));
          float moon1Glow = exp(-moon1Dist * moon1Dist * 3.0) * 0.8;
          col += vec3(0.9, 0.85, 0.7) * moon1Glow;
          
          // Moon with craters effect
          if (moon1Dist < 0.08) {
            float craterNoise = noise((uv - moon1Pos) * 50.0 + iTime * 0.1);
            col = mix(col, vec3(0.7, 0.65, 0.55), craterNoise * 0.3);
          }

          // Add second moon
          vec2 moon2Pos = vec2(0.8, 0.2);
          float moon2Dist = length((uv - moon2Pos) * vec2(iResolution.x / iResolution.y, 1.0));
          float moon2Glow = exp(-moon2Dist * moon2Dist * 2.5) * 0.6;
          col += vec3(0.8, 0.9, 1.0) * moon2Glow;
          
          if (moon2Dist < 0.06) {
            float craterNoise2 = noise((uv - moon2Pos) * 40.0 + iTime * 0.15);
            col = mix(col, vec3(0.5, 0.6, 0.7), craterNoise2 * 0.4);
          }

          // Milky way effect
          float milkyWay = noise(vec2(uv.x * 3.0, uv.y * 10.0 + iTime * 0.05)) * 0.3;
          col += vec3(0.3, 0.2, 0.5) * milkyWay * 0.3;

          // Slight color gradient from bottom to top
          col += vec3(0.05, 0.02, 0.1) * (1.0 - uv.y) * 0.2;

          gl_FragColor = vec4(col, 1.0);
        }
      `

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        },
        vertexShader,
        fragmentShader,
      })

      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      let frameId
      const animate = () => {
        material.uniforms.iTime.value += 0.016
        renderer.render(scene, camera)
        frameId = requestAnimationFrame(animate)
      }
      animate()

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight)
      }
      window.addEventListener("resize", handleResize)

      return () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener("resize", handleResize)
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}

export default StarryNightBackground
