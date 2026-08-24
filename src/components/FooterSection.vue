<template>
  <footer class="footer-section full-width-section">
    <div class="footer-container">
      <!-- VỆT ĐƯỜNG PHÂN CÁCH MỎNG -->
      <div class="divider-line"></div>

      <!-- LỜI CẢM ƠN -->
      <div class="thank-you-block">
        <p class="thank-text">
          Sự hiện diện của quý khách<br />
          là niềm vinh hạnh cho gia đình chúng tôi
        </p>
        <h2 class="welcome-heading">Rất hân hạnh được đón tiếp!</h2>
      </div>

      <!-- BIỂU TƯỢNG 囍 TỎA RÁNG HIỆU ỨNG PULSE -->
      <div class="xi-badge-wrapper">
        <div class="xi-circle-pulse">
          <div class="pulse-wave"></div>
          <div class="pulse-wave wave-2"></div>
          <div class="xi-circle">
            <span>囍</span>
          </div>
        </div>
      </div>

      <!-- COPYRIGHT -->
      <p class="copyright-text">
        © 2026 {{ groomName }} &amp; {{ brideName }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  props: {
    groomName: {
      type: String,
      default: 'Nhật Huy'
    },
    brideName: {
      type: String,
      default: 'Duyên Đỗ'
    }
  }
}
</script>

<style scoped>
.footer-section {
  padding: 20px 20px 40px;
  background-color: #faf8f5;
  text-align: center;
  color: #333333;
  overflow: hidden;
}

.footer-container {
  max-width: 600px;
  margin: 0 auto;
}

.divider-line {
  width: 60px;
  height: 1px;
  background-color: #a32a29;
  margin: 0 auto 40px;
  opacity: 0.6;
}

.thank-you-block {
  margin-bottom: 30px;
}

.thank-text {
  font-size: 0.85rem;
  color: #777777;
  line-height: 1.6;
  margin-bottom: 12px;
  font-weight: 400;
}

.welcome-heading {
  font-family: 'Alex Brush', 'Dancing Script', cursive;
  font-size: 2.8rem;
  color: #c09c5d;
  font-weight: normal;
  margin: 0;
  line-height: 1.3;
}

/* CONTAINER TỎA SÁNG CỦA CHỮ HỶ */
.xi-badge-wrapper {
  display: flex;
  justify-content: center;
  margin: 35px 0;
}

.xi-circle-pulse {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* NỀN VÒNG TRÒN CHỮ HỶ */
.xi-circle {
  position: relative;
  z-index: 2;
  width: 50px;
  height: 50px;
  background-color: #a32a29;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(163, 42, 41, 0.35);
  border: 3px solid #f2e9e1;
}

/* HIỆU ỨNG SÓNG TỎA RA (PULSE RIPPLE) */
.pulse-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(163, 42, 41, 0.4);
  z-index: 1;
  animation: pulseRipple 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulse-wave.wave-2 {
  animation-delay: 1.2s;
}

@keyframes pulseRipple {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.copyright-text {
  font-size: 0.72rem;
  color: #a0a0a0;
  letter-spacing: 0.5px;
}

/* RESPONSIVE MOBILE */
@media (max-width: 576px) {
  .welcome-heading {
    font-size: 2.2rem;
  }
  
  .xi-circle-pulse {
    width: 46px;
    height: 46px;
  }

  .xi-circle {
    width: 44px;
    height: 44px;
    font-size: 1.15rem;
  }
}
</style>