<template>
  <section class="cover-door" :class="{ opened: isOpened }">
    <!-- 2 Cánh cửa mở sang 2 bên -->
    <div class="door-panel door-left"></div>
    <div class="door-panel door-right"></div>

    <!-- Canvas hạt trái tim bay lên như bong bóng -->
    <canvas 
      ref="particleCanvas" 
      id="particleHeartCanvas" 
      :class="{ 'fade-out': isOpened }"
    ></canvas>

    <!-- Khung nội dung giữa màn hình theo mẫu thiết kế -->
    <div class="cover-content">
      <span class="sub-header">WEDDING INVITATION</span>

      <!-- Nút Chữ Hỷ Tỏa Ra & Nhấn Để Mở Thiệp -->
      <div 
        class="double-happiness-badge pulse-effect" 
        @click="handleOpen"
        role="button"
        tabindex="0"
        title="Nhấn để mở thiệp"
      >
        <span class="double-happiness-text">囍</span>
      </div>

      <h1 class="main-title">
        <span class="groom-short">{{ data.groom?.shortName }}</span>
        <span class="heart-sep">♥</span>
        <span class="bride-short">{{ data.bride?.shortName }}</span>
      </h1>

      <div class="date-location-wrapper">
        <div class="date-line-container">
          <span class="line"></span>
          <p class="wedding-date-text display-date">{{ formattedDate }}</p>
          <span class="line"></span>
        </div>
        <p class="location-text location-city">{{ formattedLocation }}</p>
      </div>

      <!-- Cuộn / Gợi ý mở thiệp -->
      <div class="scroll-hint" @click="handleOpen">
        <span class="hint-text">CUỘN ĐỂ MỞ THIỆP</span>
        <span class="arrow-down">▼</span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
    const particleCanvas = ref(null)
    let animationFrameId = null

    const formattedDate = computed(() => {
      const rawDate = props.data?.displayDate || ''
      const parts = rawDate.match(/\d+/g)
      if (parts && parts.length >= 3) {
        const day = parts[0].padStart(2, '0')
        const month = parts[1].padStart(2, '0')
        const year = parts[2]
        return `${day} . ${month} . ${year}`
      }
      return rawDate || '03 . 08 . 2026'
    })

    const formattedLocation = computed(() => {
      const city = props.data?.locationCity || 'ĐÀ NẴNG'
      return `${city.toUpperCase()} · VIỆT NAM`
    })

    // HÀM VẼ TRÁI TIM LÊN CANVAS
    const drawHeart = (ctx, x, y, size, color, alpha) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      const topCurveHeight = size * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      // Nửa trái tim bên trái
      ctx.bezierCurveTo(
        x, y, 
        x - size / 2, y, 
        x - size / 2, y + topCurveHeight
      )
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2, 
        x, y + size, 
        x, y + size
      )
      // Nửa trái tim bên phải
      ctx.bezierCurveTo(
        x, y + size, 
        x + size / 2, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + topCurveHeight
      )
      ctx.bezierCurveTo(
        x + size / 2, y, 
        x, y, 
        x, y + topCurveHeight
      )
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // HIỆU ỨNG TRÁI TIM BỎNG BÓNG BAY LÊN
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

      // Khởi tạo danh sách các hạt trái tim bong bóng
      const hearts = []
      const heartCount = 45 // Số lượng trái tim cùng xuất hiện

      const createHeart = (initialY = null) => {
        return {
          x: Math.random() * width,
          y: initialY !== null ? initialY : height + Math.random() * 100,
          size: Math.random() * 12 + 8, // Kích thước ngẫu nhiên (8px - 20px)
          speedY: Math.random() * 1.2 + 0.6, // Tốc độ bay lên
          swingSpeed: Math.random() * 0.03 + 0.01, // Tốc độ lắc đung đưa ngang
          swingAmount: Math.random() * 1.5 + 0.5,
          swingAngle: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.5 + 0.25, // Độ trong suốt nhẹ nhàng
          color: Math.random() > 0.3 ? '#ba2b3b' : '#c09c5d' // Phối giữa Đỏ Đô & Vàng Ánh Kim
        }
      }

      for (let i = 0; i < heartCount; i++) {
        hearts.push(createHeart(Math.random() * height)) // Rải đều khắp màn hình lúc bắt đầu
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, width, height)

        hearts.forEach((h) => {
          // Cập nhật vị trí
          h.y -= h.speedY
          h.swingAngle += h.swingSpeed
          h.x += Math.sin(h.swingAngle) * h.swingAmount

          // Vẽ hình trái tim
          drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha)

          // Khi trái tim bay hết lên đỉnh màn hình, tái tạo lại ở phía dưới
          if (h.y < -30) {
            Object.assign(h, createHeart(height + 20))
          }
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
    }

    onMounted(() => {
      initParticleCanvas()
    })

    onUnmounted(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    })

    return {
      particleCanvas,
      formattedDate,
      formattedLocation,
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
  background-color: #fcfbf9;
}

.door-panel {
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100vh;
  background: #fdfbf7;
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 1;
}

.door-left {
  left: 0;
  transform-origin: left center;
  box-shadow: inset -10px 0 20px rgba(0, 0, 0, 0.02);
  border-right: 1px solid rgba(192, 156, 93, 0.25);
}

.door-right {
  right: 0;
  transform-origin: right center;
  border-left: 1px solid rgba(192, 156, 93, 0.25);
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

/* KHUNG NỘI DUNG */
.cover-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 550px;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.8s ease, opacity 0.6s ease;
}

.sub-header {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 5px;
  color: #99876d;
  font-weight: 600;
  text-transform: uppercase;
}

.double-happiness-badge {
  position: relative;
  width: 96px;
  height: 96px;
  background-color: #ba2b3b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 6px 16px rgba(186, 43, 59, 0.3);
}

.double-happiness-badge:hover {
  transform: scale(1.06);
  background-color: #a32433;
}

.double-happiness-text {
  color: #ffffff;
  font-size: 3.2rem;
  line-height: 1;
  font-weight: 500;
  margin-top: -3px;
}

.pulse-effect::before,
.pulse-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 1px solid rgba(186, 43, 59, 0.6);
  animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  pointer-events: none;
}

.pulse-effect::after {
  animation-delay: 0.8s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

.main-title {
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
  font-size: 2.3rem;
  font-weight: 400;
  color: #2b2b2b;
  margin: 10px 0 0 0;
  letter-spacing: -0.5px;
}

.heart-sep {
  color: #ba2b3b;
  font-size: 1rem;
  margin: 0 8px;
  vertical-align: middle;
}

.date-location-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.date-line-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.date-line-container .line {
  width: 35px;
  height: 1px;
  background-color: #d1c5b4;
}

.wedding-date-text {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #7d6b54;
  letter-spacing: 2px;
  margin: 0;
}

.location-city {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.72rem;
  color: #9c8c77;
  letter-spacing: 3px;
  margin: 0;
  text-transform: uppercase;
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.3s;
}

.scroll-hint:hover {
  opacity: 1;
}

.hint-text {
  font-size: 0.68rem;
  letter-spacing: 4px;
  color: #8c7d6b;
  font-weight: 500;
}

.arrow-down {
  font-size: 0.55rem;
  color: #ba2b3b;
  animation: bounce 1.8s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(2px);
  }
}

.cover-door.opened .door-left {
  transform: translateX(-100%);
}

.cover-door.opened .door-right {
  transform: translateX(100%);
}

.cover-door.opened .cover-content {
  transform: scale(0.9);
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

@media (max-width: 480px) {
  .cover-content {
    height: 90vh;
    padding: 30px 15px;
  }
  .double-happiness-badge {
    width: 84px;
    height: 84px;
  }
  .double-happiness-text {
    font-size: 2.8rem;
  }
  .main-title {
    font-size: 1.9rem;
  }
}
</style>