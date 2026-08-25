<template>
  <section class="section countdown-section full-width-section">
    <!-- Khung viền hoa văn trang trọng -->
    <div class="ornamental-frame">
      <div class="container-inner">
        <!-- Badge hoa văn trang trí nhỏ phía trên -->
        <div class="top-ornament">
          <span class="gold-leaf">❧</span>
          <span class="section-subtitle">COUNTDOWN TO THE SPECIAL DAY</span>
          <span class="gold-leaf">☙</span>
        </div>

        <h2 class="countdown-quote">Cùng Đếm Ngược Thời Gian</h2>
        <div class="countdown-divider">
          <span class="diamond-icon">◆</span>
        </div>

        <!-- Lưới đồng hồ đếm ngược -->
        <div class="timer-grid">
          <div class="time-card">
            <span class="card-corner top-left"></span>
            <span class="card-corner bottom-right"></span>
            <span class="time-num">{{ timeLeft.days }}</span>
            <span class="time-label">NGÀY</span>
          </div>

          <span class="timer-separator">:</span>

          <div class="time-card">
            <span class="card-corner top-left"></span>
            <span class="card-corner bottom-right"></span>
            <span class="time-num">{{ timeLeft.hours }}</span>
            <span class="time-label">GIỜ</span>
          </div>

          <span class="timer-separator">:</span>

          <div class="time-card">
            <span class="card-corner top-left"></span>
            <span class="card-corner bottom-right"></span>
            <span class="time-num">{{ timeLeft.minutes }}</span>
            <span class="time-label">PHÚT</span>
          </div>

          <span class="timer-separator">:</span>

          <div class="time-card">
            <span class="card-corner top-left"></span>
            <span class="card-corner bottom-right"></span>
            <span class="time-num">{{ timeLeft.seconds }}</span>
            <span class="time-label">GIÂY</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CountdownSection',
  props: {
    weddingDateISO: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const timeLeft = ref({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    })

    let timerInterval = null

    const updateCountdown = () => {
      const targetDate = new Date(props.weddingDateISO).getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
        if (timerInterval) clearInterval(timerInterval)
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      timeLeft.value = {
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      }
    }

    onMounted(() => {
      updateCountdown()
      timerInterval = setInterval(updateCountdown, 1000)
    })

    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval)
    })

    return {
      timeLeft
    }
  }
}
</script>

<style scoped>
.countdown-section {
  padding: 70px 20px;
  background: linear-gradient(135deg, #8a2120 0%, #631413 100%);
  color: #ffffff;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Khung viền nổi cổ điển bao bọc toàn bộ section */
.ornamental-frame {
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid rgba(192, 156, 93, 0.4);
  padding: 40px 25px;
  position: relative;
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.25);
}

.ornamental-frame::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 1px solid rgba(192, 156, 93, 0.2);
  pointer-events: none;
}

.container-inner {
  max-width: 750px;
  margin: 0 auto;
}

.top-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.gold-leaf {
  color: #c09c5d;
  font-size: 1.1rem;
}

.section-subtitle {
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: #d8c29d;
  font-weight: 500;
}

.countdown-quote {
  font-family: 'Alex Brush', cursive;
  font-size: 3.5rem;
  color: #f8e5cc;
  margin-bottom: 6px;
  font-weight: normal;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.countdown-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 35px;
  width: 120px;
  position: relative;
}

.countdown-divider::before,
.countdown-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c09c5d, transparent);
}

.diamond-icon {
  color: #c09c5d;
  font-size: 0.5rem;
  padding: 0 8px;
}

.timer-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Card đếm ngược thiết kế kiểu vintage glass */
.time-card {
  position: relative;
  background: rgba(40, 10, 10, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(192, 156, 93, 0.45);
  padding: 18px 22px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.time-card:hover {
  transform: translateY(-3px);
  border-color: rgba(192, 156, 93, 0.8);
}

/* Chi tiết trang trí góc vuông cổ điển */
.card-corner {
  position: absolute;
  width: 6px;
  height: 6px;
  border-color: #c09c5d;
  border-style: solid;
}

.top-left {
  top: 3px;
  left: 3px;
  border-width: 1px 0 0 1px;
}

.bottom-right {
  bottom: 3px;
  right: 3px;
  border-width: 0 1px 1px 0;
}

.time-num {
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1;
  font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

.time-label {
  font-size: 0.68rem;
  letter-spacing: 2.5px;
  color: #c09c5d;
  margin-top: 10px;
  font-weight: 600;
}

.timer-separator {
  font-size: 1.8rem;
  color: rgba(192, 156, 93, 0.6);
  font-family: 'Cinzel', serif;
  margin-top: -15px;
}

/* Responsive */
@media (max-width: 768px) {
  .timer-separator {
    display: none;
  }
}

@media (max-width: 576px) {
  .countdown-section {
    padding: 45px 12px;
  }
  .ornamental-frame {
    padding: 25px 12px;
  }
  .countdown-quote {
    font-size: 2.6rem;
  }
  .timer-grid {
    gap: 10px;
  }
  .time-card {
    padding: 12px 10px;
    min-width: 72px;
  }
  .time-num {
    font-size: 1.8rem;
  }
  .time-label {
    font-size: 0.6rem;
    letter-spacing: 1.5px;
  }
}
</style>