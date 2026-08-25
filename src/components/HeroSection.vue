<template>
  <section class="hero-section grid-bg full-width-section">
    <!-- Canvas hạt trái tim bay lên như bong bóng -->
    <canvas ref="heroParticleCanvas" id="heroParticleHeartCanvas"></canvas>

    <div class="hero-container-custom">
      <!-- Cột Nội Dung Bên Trái -->
      <div class="hero-text-content">
        <!-- Huy hiệu 囍 nhỏ với hiệu ứng tỏa sóng chính tâm -->
        <div class="mini-badge-wrapper">
          <div class="mini-badge">
            <span>囍</span>
          </div>
        </div>

        <p class="sub-title-header">WE'RE GETTING MARRIED</p>

        <!-- Tên Chú Rể & Cô Dâu -->
        <div class="couple-heading-wrapper">
          <h1 class="couple-name groom">{{ data.groom?.shortName || 'Nhật Huy' }}</h1>
          <div class="ampersand-row">
            <span class="ampersand">&amp;</span>
            <h1 class="couple-name bride">{{ data.bride?.shortName || 'Duyên Đỗ' }}</h1>
          </div>
        </div>

        <!-- Khung 3 cột Thông tin Tiệc cưới -->
        <div class="info-three-columns">
          <div class="info-col">
            <span class="col-main">{{ data.displayDate || '03.08' }}</span>
            <span class="col-sub">2026</span>
          </div>
          <div class="info-col border-left-right">
            <span class="col-main">{{ data.partyInfo?.time || '17:00' }}</span>
            <span class="col-sub">THỨ HAI</span>
          </div>
          <div class="info-col">
            <span class="col-main">{{ data.partyInfo?.restaurantName || 'PHI LŨ' }}</span>
            <span class="col-sub">{{ data.partyInfo?.hallName || 'SẢNH PEARL' }}</span>
          </div>
        </div>

        <!-- Nút Xem Địa Điểm Tiệc -->
        <a :href="data.partyInfo?.mapDirectUrl || '#venue'" class="venue-btn">
          <span class="pin-icon">📍</span> XEM ĐỊA ĐIỂM TIỆC <span class="arrow">↓</span>
        </a>

        <!-- Khung Kính Mời Khách -->
        <div class="guest-invitation-block">
          <p class="invitation-text-intro">TRÂN TRỌNG KÍNH MỜI</p>
          <div v-if="guestName" class="guest-box">
            <span class="guest-label">Mời anh/chị/bạn:</span>
            <h1 class="guest-name">{{ guestName }}</h1>
          </div>
          <div v-else class="guest-box">
            <h1 class="guest-name default-title">Quý Khách &amp; Bạn Bè</h1>
          </div>
        </div>
      </div>

      <!-- Cột Khung Ảnh Polaroid Bên Phải -->
      <div class="hero-image-wrapper">
        <div class="polaroid-frame">
          
          <!-- HIỆU ỨNG NÉT VẼ TRÁI TIM BAO QUANH ẢNH -->
          <svg class="heart-draw-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              class="heart-path"
              d="M 50 90 
                 C 20 65, 5 45, 5 28 
                 C 5 12, 22 5, 38 12 
                 C 45 15, 50 22, 50 22 
                 C 50 22, 55 15, 62 12 
                 C 78 5, 95 12, 95 28 
                 C 95 45, 80 65, 50 90 Z"
            />
          </svg>

          <div class="photo-container">
            <img :src="data.heroPhoto" alt="Ảnh cưới chú rể & cô dâu" />
          </div>
          <p class="polaroid-caption">
            {{ data.displayDate || '03.08.2026' }}<span class="heart-icon">♥</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HeroSection',
  props: {
    data: {
      type: Object,
      required: true
    },
    guestName: {
      type: String,
      default: 'Quý Khách'
    }
  },
  setup() {
    const heroParticleCanvas = ref(null)
    let animationFrameId = null

    // HÀM VẼ TRÁI TIM LÊN CANVAS
    const drawHeart = (ctx, x, y, size, color, alpha) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      const topCurveHeight = size * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size)
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // HIỆU ỨNG TRÁI TIM BỎNG BÓNG BAY LÊN
    const initHeroParticleCanvas = () => {
      const canvas = heroParticleCanvas.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
      let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

      const handleResize = () => {
        if (!canvas || !canvas.parentElement) return
        width = canvas.width = canvas.parentElement.clientWidth
        height = canvas.height = canvas.parentElement.clientHeight
      }
      window.addEventListener('resize', handleResize)

      const hearts = []
      const heartCount = 35

      const createHeart = (initialY = null) => {
        return {
          x: Math.random() * width,
          y: initialY !== null ? initialY : height + Math.random() * 80,
          size: Math.random() * 11 + 7,
          speedY: Math.random() * 1.0 + 0.5,
          swingSpeed: Math.random() * 0.03 + 0.01,
          swingAmount: Math.random() * 1.5 + 0.5,
          swingAngle: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.45 + 0.2,
          color: Math.random() > 0.35 ? '#a32a29' : '#c09c5d'
        }
      }

      for (let i = 0; i < heartCount; i++) {
        hearts.push(createHeart(Math.random() * height))
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, width, height)

        hearts.forEach((h) => {
          h.y -= h.speedY
          h.swingAngle += h.swingSpeed
          h.x += Math.sin(h.swingAngle) * h.swingAmount

          drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha)

          if (h.y < -30) {
            Object.assign(h, createHeart(height + 20))
          }
        })

        animationFrameId = requestAnimationFrame(drawParticles)
      }

      drawParticles()
    }

    onMounted(() => {
      initHeroParticleCanvas()
    })

    onUnmounted(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    })

    return {
      heroParticleCanvas
    }
  }
}
</script>

<style scoped>
/* Nền Caro Nhạt */
.hero-section {
  position: relative;
  padding: 80px 20px 60px;
  background-color: #fbf9f6;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  overflow: hidden;
}

#heroParticleHeartCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.hero-container-custom {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  margin: 0 auto;
}

.hero-text-content {
  flex: 1;
  text-align: left;
  max-width: 500px;
}

.mini-badge-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-bottom: 16px;
}

.mini-badge {
  width: 36px;
  height: 36px;
  background-color: #a32a29;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 10px rgba(163, 42, 41, 0.5);
}

.mini-badge-wrapper::before,
.mini-badge-wrapper::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(163, 42, 41, 0.4);
  transform: translate(-50%, -50%) scale(1);
  transform-origin: center center;
  animation: pulse-glow 2.5s infinite ease-out;
  pointer-events: none;
  z-index: 1;
}

.mini-badge-wrapper::after {
  animation-delay: 1.25s;
}

@keyframes pulse-glow {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.2);
    opacity: 0;
  }
}

.sub-title-header {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #888;
  font-weight: 600;
  margin-bottom: 12px;
}

.couple-heading-wrapper {
  margin-bottom: 30px;
}

.couple-name {
  font-family: 'Alex Brush', cursive;
  font-size: 4.2rem;
  font-weight: normal;
  color: #222;
  line-height: 1;
}

.ampersand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: -10px;
}

.ampersand {
  font-family: 'Alex Brush', cursive;
  font-size: 3.8rem;
  color: #a32a29;
  line-height: 1;
}

.info-three-columns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e5dec9;
  border-bottom: 1px solid #e5dec9;
  padding: 16px 0;
  margin-bottom: 24px;
  text-align: center;
}

.info-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.border-left-right {
  border-left: 1px solid #e5dec9;
  border-right: 1px solid #e5dec9;
}

.col-main {
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.5px;
}

.col-sub {
  font-size: 0.68rem;
  color: #888;
  letter-spacing: 1.5px;
  margin-top: 4px;
  text-transform: uppercase;
}

.venue-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #d1c7b7;
  background-color: transparent;
  color: #a32a29;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.venue-btn:hover {
  background-color: #a32a29;
  color: #ffffff;
  border-color: #a32a29;
}

.guest-invitation-block {
  text-align: left;
}

.invitation-text-intro {
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: #999;
  font-weight: 600;
  margin-bottom: 4px;
}

.guest-box {
  margin: 15px 0;
  padding: 12px 20px;
  border-top: 1px dashed rgba(192, 156, 93, 0.5);
  border-bottom: 1px dashed rgba(192, 156, 93, 0.5);
  display: inline-block;
}

.guest-label {
  font-size: 0.85rem;
  color: #888888;
  display: block;
  margin-bottom: 4px;
}

.guest-name {
  font-family: 'Alex Brush', cursive;
  font-size: 3.2rem;
  color: #c09c5d;
  font-weight: normal;
  line-height: 1.1;
  margin: 0;
}

.default-title {
  font-size: 2.2rem;
}

.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* KHUNG POLAROID */
.polaroid-frame {
  position: relative;
  background: #ffffff;
  padding: 18px 18px 24px 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  transform: rotate(3deg);
  transition: transform 0.4s ease;
  max-width: 420px;
  width: 100%;
}

.polaroid-frame:hover {
  transform: rotate(0deg) scale(1.02);
}

/* HIỆU ỨNG TRÁI TIM VẼ BAO QUANH POLAROID */
.heart-draw-svg {
  position: absolute;
  top: -20px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  pointer-events: none;
  z-index: 5;
  filter: drop-shadow(0 0 6px rgba(192, 156, 93, 0.6));
}

.heart-path {
  fill: none;
  stroke: #c09c5d;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-heart 4s ease-in-out infinite alternate;
}

@keyframes draw-heart {
  0% {
    stroke-dashoffset: 400;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.8;
  }
}

.photo-container {
  width: 100%;
  height: 480px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.polaroid-caption {
  font-family: 'Alex Brush', cursive;
  font-size: 2.2rem;
  color: #c09c5d;
  margin-top: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.heart-icon {
  font-size: 1.2rem;
  color: #c09c5d;
}

@media (max-width: 992px) {
  .hero-container-custom {
    flex-direction: column-reverse;
    gap: 40px;
  }

  .hero-text-content {
    text-align: center;
    max-width: 100%;
  }

  .mini-badge-wrapper {
    margin: 0 auto 12px auto;
  }

  .ampersand-row {
    justify-content: center;
  }

  .guest-invitation-block {
    text-align: center;
  }

  .polaroid-frame {
    max-width: 360px;
    transform: rotate(0deg);
  }

  .photo-container {
    height: 400px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 40px 15px;
  }

  .couple-name {
    font-size: 3.2rem;
  }

  .ampersand {
    font-size: 2.8rem;
  }

  .guest-name {
    font-size: 2.4rem;
  }

  .polaroid-frame {
    max-width: 300px;
    padding: 12px 12px 18px 12px;
  }

  .photo-container {
    height: 320px;
  }

  .col-main {
    font-size: 0.95rem;
  }

  .col-sub {
    font-size: 0.6rem;
  }

  .heart-draw-svg {
    top: -12px;
    left: -12px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
  }
}
</style>