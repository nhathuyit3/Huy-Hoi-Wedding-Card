<template>
  <section class="section countdown-section full-width-section">
    <div class="container-inner">
      <p class="countdown-quote">Cùng đếm ngược thời gian tới ngày vui</p>
      <div class="countdown-divider"></div>

      <div class="timer-grid">
        <div class="time-card">
          <span class="time-num">{{ timeLeft.days }}</span>
          <span class="time-label">NGÀY</span>
        </div>
        <div class="time-card">
          <span class="time-num">{{ timeLeft.hours }}</span>
          <span class="time-label">GIỜ</span>
        </div>
        <div class="time-card">
          <span class="time-num">{{ timeLeft.minutes }}</span>
          <span class="time-label">PHÚT</span>
        </div>
        <div class="time-card">
          <span class="time-num">{{ timeLeft.seconds }}</span>
          <span class="time-label">GIÂY</span>
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
  padding: 60px 20px;
  background: linear-gradient(135deg, #a32a29 0%, #821f1e 100%);
  color: #ffffff;
  text-align: center;
}

.container-inner {
  max-width: 800px;
  margin: 0 auto;
}

.countdown-quote {
  font-size: 2.4rem;
  color: #f8e5cc;
  margin-bottom: 8px;
}

.countdown-divider {
  width: 50px;
  height: 2px;
  background-color: #f8e5cc;
  margin: 0 auto 30px;
  opacity: 0.8;
}

.timer-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.time-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.time-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  font-family: 'Montserrat', sans-serif;
}

.time-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #f8e5cc;
  margin-top: 6px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 576px) {
  .countdown-section {
    padding: 45px 15px;
  }
  .countdown-quote {
    font-size: 1.9rem;
  }
  .timer-grid {
    gap: 10px;
  }
  .time-card {
    padding: 12px 10px;
    min-width: 70px;
  }
  .time-num {
    font-size: 1.7rem;
  }
  .time-label {
    font-size: 0.65rem;
    letter-spacing: 1px;
  }
}
</style>