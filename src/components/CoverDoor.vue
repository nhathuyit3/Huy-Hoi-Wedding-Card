<template>
  <section class="cover-door" :class="{ opened: isOpened }">
    <!-- 2 Cánh cửa mở sang 2 bên -->
    <div class="door-panel door-left"></div>
    <div class="door-panel door-right"></div>

    <!-- Canvas hạt trái tim xoay -->
    <canvas 
      ref="particleCanvas" 
      id="particleHeartCanvas" 
      :class="{ 'fade-out': isOpened }"
    ></canvas>

    <!-- Khung nội dung giữa màn hình -->
    <div class="cover-content modern-glass">
      <div class="wedding-badge double-happiness-badge">
        <span class="double-happiness-text">囍</span>
      </div>

      <span class="sub-header">SAVE OUR DATE</span>

      <h1 class="main-title">
        <span class="groom-short">{{ data.groom?.shortName }}</span>
        <span class="heart-sep">♥</span>
        <span class="bride-short">{{ data.bride?.shortName }}</span>
      </h1>

      <div class="date-location-wrapper">
        <p class="wedding-date-text display-date">{{ data.displayDate }}</p>
        <span class="dot-divider">•</span>
        <p class="location-text location-city">{{ data.locationCity }}</p>
      </div>

      <!-- Nút Bấm Mở Thiệp -->
      <button @click="handleOpen" class="open-card-btn modern-btn">
        <span class="btn-text">MỞ THIỆP CƯỚI</span>
        <span class="btn-icon">♥</span>
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CoverDoor',
  props: {
    data: {
      type: Object,
      required: true
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open'],
  setup(props, { emit }) {
    // Element Canvas
    const particleCanvas = ref(null)
    let animationFrameId = null

    // Hàm tạo hiệu ứng Canvas Trái tim
    const initParticleCanvas = () => {
      const canvas = particleCanvas.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const handleResize = () => {
        if (!canvas) return
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }
      window.addEventListener('resize', handleResize)

      // Công thức hình trái tim
      const heartEquation = (t) => {
        const x = 16 * Math.pow(Math.sin(t), 3)
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        return { x, y }
      }

      const particles = []
      const particleCount = 1500
      const scale = Math.min(width, height) / 34

      for (let i = 0; i < particleCount; i++) {
        const t = Math.PI * 2 * Math.random()
        const edgePos = heartEquation(t)
        const r = Math.sqrt(Math.random())

        particles.push({
          baseX: edgePos.x * r,
          baseY: edgePos.y * r,
          x: (Math.random() - 0.5) * width * 1.5,
          y: (Math.random() - 0.5) * height * 1.5,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.03 + 0.015,
          alpha: Math.random() * 0.7 + 0.3
        })
      }

      let rotationAngle = 0
      let rotationSpeed = 0.006

      const drawParticles = () => {
        ctx.clearRect(0, 0, width, height)

        rotationAngle += rotationSpeed
        if (rotationAngle > 0.1 || rotationAngle < -0.1) {
          rotationSpeed = -rotationSpeed
        }

        const centerX = width / 2
        const centerY = height / 2 - 20

        particles.forEach((p) => {
          const rotatedX = p.baseX * Math.cos(rotationAngle) - p.baseY * Math.sin(rotationAngle)
          const rotatedY = p.baseX * Math.sin(rotationAngle) + p.baseY * Math.cos(rotationAngle)

          const targetX = centerX + rotatedX * scale
          const targetY = centerY + rotatedY * scale

          p.x += (targetX - p.x) * p.speed
          p.y += (targetY - p.y) * p.speed

          ctx.fillStyle = `rgba(163, 42, 41, ${p.alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(drawParticles)
      }

      drawParticles()
    }

    const handleOpen = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      emit('open')
      // // Dừng animation canvas sau khi mở cửa 1.2s để tiết kiệm CPU/GPU
      // setTimeout(() => {
      //   if (animationFrameId) cancelAnimationFrame(animationFrameId)
      // }, 1200)
    }

    onMounted(() => {
      initParticleCanvas()
    })

    onUnmounted(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    })

    return {
      particleCanvas,
      handleOpen
    }
  }
}
</script>

<style scoped>
.cover-door {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

.door-panel {
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100vh;
  background: radial-gradient(circle, #ffffff 0%, #f5efe9 100%);
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 1;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.03);
}

.door-left {
  left: 0;
  transform-origin: left center;
  border-right: 1px solid rgba(212, 169, 112, 0.3);
}

.door-right {
  right: 0;
  transform-origin: right center;
  border-left: 1px solid rgba(212, 169, 112, 0.3);
}

#particleHeartCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.cover-content {
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.88);
  padding: 40px 24px;
  border-radius: 24px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.9);
  max-width: 90%;
  width: 420px;
  text-align: center;
  transition: transform 0.8s ease, opacity 0.6s ease;
}

.sub-header {
  font-size: 0.8rem;
  letter-spacing: 3px;
  color: #777;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
}

.double-happiness-badge {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #a32a29 0%, #821f1e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 18px auto;
  outline: 6px solid #f2e2e2;
}

.double-happiness-text {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: bold;
}

.main-title {
  font-size: 2.8rem;
  color: #222;
  margin: 10px 0;
}

.heart-sep {
  color: #a32a29;
  font-size: 1.2rem;
  margin: 0 6px;
}

.date-location-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 24px;
  font-size: 0.95rem;
}

.wedding-date-text {
  font-weight: 600;
  color: #555;
  letter-spacing: 1px;
}

.dot-divider {
  color: #a32a29;
}

.location-city {
  color: #888;
  letter-spacing: 1px;
}

.open-card-btn {
  background: linear-gradient(135deg, #a32a29 0%, #821f1e 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(163, 42, 41, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.3s ease;
}

.open-card-btn:hover {
  transform: translateY(-2px) scale(1.03);
}

/* HIỆU ỨNG KHI MỞ THIỆP */
.cover-door.opened .door-left {
  transform: translateX(-100%);
}

.cover-door.opened .door-right {
  transform: translateX(100%);
}

.cover-door.opened .cover-content {
  transform: scale(0.8);
  opacity: 0;
}

.cover-door.opened {
  pointer-events: none;
  visibility: hidden;
  transition: visibility 0s linear 1.2s;
}

#particleHeartCanvas.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* RESPONSIVE CHO MÀN HÌNH NHỎ */
@media (max-width: 480px) {
  .cover-content {
    padding: 30px 16px;
  }
  .main-title {
    font-size: 2.2rem;
  }
}
</style>