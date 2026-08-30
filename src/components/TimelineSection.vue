<template>
  <section class="section timeline-section full-width-section">
    <div class="falling-hearts-container" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="falling-heart" :style="getHeartStyle(n)">♥</span>
    </div>

    <!-- Nếp gấp gáy sổ hoài cổ -->
    <div class="notebook-spine"></div>

    <div class="container-inner">
      <!-- Tiêu đề phần Story -->
      <div class="timeline-header">
        <p class="section-subheading">OUR LOVE STORY</p>
        <h2 class="section-heading">Hành Trình Bên Nhau</h2>
        <div class="title-divider">
          <span class="heart-icon">♥</span>
        </div>
      </div>

      <!-- Danh sách các mốc kỷ niệm -->
      <div class="timeline-container">
        <div 
          v-for="(item, index) in timelineList" 
          :key="index" 
          class="timeline-item"
          :class="{ 'reverse': index % 2 !== 0 }"
        >
          <!-- Connector lines -->
          <div class="connector-line left-line"></div>
          <div class="connector-line right-line"></div>

          <!-- Cột Hình Ảnh (Ảnh in Polaroid) -->
          <div class="timeline-media">
            <div class="printed-photo-card">
              <div class="photo-pin"></div>
              <div class="timeline-img-frame">
                <img :src="item.image" :alt="item.title" loading="lazy" />
              </div>
            </div>
          </div>

          <!-- Mốc Tròn Kỷ Niệm Chính Giữa -->
          <div class="timeline-badge">
            <span class="badge-year">{{ item.date }}</span>
          </div>

          <!-- Cột Nội Dung Văn Bản (Typography Trang Trọng) -->
          <div class="timeline-content">
            <span class="timeline-date-tag">{{ item.date }}</span>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TimelineSection',
  props: {
    timeline: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const timelineList = computed(() => props.timeline)
    
    const getHeartStyle = (index) => {
      const left = (index * 8.3) % 100
      const duration = 6 + (index % 5) * 2
      const delay = (index % 4) * 1.5
      const size = 0.8 + (index % 3) * 0.4
      return {
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        fontSize: `${size}rem`
      }
    }

    return {
      timelineList,
      getHeartStyle
    }
  }
}
</script>

<style scoped>
/* Nạp Font Trang Trọng (Playfair Display & Lora hỗ trợ tiếng Việt) */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,500..800;1,500..800&display=swap');

/* 📖 PHONG CÁCH SỔ TAY HOÀI CỔ (VINTAGE NOTEBOOK) */
.timeline-section {
  padding: 80px 20px;
  background-color: #f7f1e3;
  background-image: 
    linear-gradient(rgba(195, 176, 145, 0.22) 1px, transparent 1px),
    radial-gradient(rgba(163, 138, 99, 0.08) 1px, transparent 0);
  background-size: 100% 30px, 16px 16px;
  background-position: 0 0, 0 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 100px rgba(110, 85, 50, 0.12);
  font-family: 'Lora', serif; /* Font Serif hoài cổ toàn section */
}

/* Gáy sổ hoài cổ */
.notebook-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3%;
  width: 2px;
  border-left: 2px dashed rgba(163, 42, 41, 0.35);
  pointer-events: none;
}

.falling-hearts-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.falling-heart {
  position: absolute;
  top: -30px;
  color: rgba(163, 42, 41, 0.2);
  animation: heart-fall linear infinite;
}

@keyframes heart-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(1000px) rotate(360deg); opacity: 0; }
}

.container-inner {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.timeline-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-subheading {
  font-size: 0.85rem;
  letter-spacing: 4px;
  color: #8c7355;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: 'Lora', serif;
}

.section-heading {
  font-size: 2.6rem;
  color: #7a1c1b;
  font-weight: 600;
  font-family: 'Playfair Display', serif; /* Font tiêu đề sang trọng */
  letter-spacing: 0.5px;
}

.title-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.heart-icon {
  color: #7a1c1b;
  font-size: 1.2rem;
}

/* Timeline Container */
.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #c0b198 5%, #c0b198 95%, transparent);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 70px;
  position: relative;
}

.timeline-media,
.timeline-content {
  width: 42%;
  position: relative;
  z-index: 2;
}

.timeline-media {
  display: flex;
  justify-content: flex-end;
}

/* 📸 ẢNH IN POLAROID TRÊN NỀN SỔ TAY */
.printed-photo-card {
  position: relative;
  background: #fffdf9;
  padding: 12px 12px 28px 12px;
  border-radius: 2px;
  box-shadow: 0 10px 25px rgba(85, 65, 40, 0.18), 0 2px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid #ebd8c3;
  transform: rotate(-1.8deg);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  max-width: 380px;
  width: 100%;
}

.timeline-item.reverse .printed-photo-card {
  transform: rotate(1.8deg);
}

.printed-photo-card:hover {
  transform: translateY(-6px) rotate(0deg) scale(1.02);
  box-shadow: 0 18px 36px rgba(122, 28, 27, 0.22);
  border-color: #d1a884;
}

.photo-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: #b58d63;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  z-index: 3;
}

.timeline-img-frame {
  width: 100%;
  height: auto;
  max-height: 480px;
  overflow: hidden;
  border-radius: 2px;
  background: #f1e9db;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-img-frame img {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  display: block;
}

/* 〰️ ĐƯỜNG LINE NỐI MỰC NÂU VINTAGE */
.connector-line {
  position: absolute;
  top: 50%;
  height: 2px;
  border-top: 2px dashed #b5a186;
  z-index: 1;
  pointer-events: none;
}

.left-line {
  left: 42%;
  width: 8%;
}

.right-line {
  right: 42%;
  width: 8%;
}

/* Badge con dấu kỷ niệm */
.timeline-badge {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8a2423 0%, #681716 100%);
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px #f7f1e3, 0 6px 16px rgba(100, 30, 25, 0.3);
  z-index: 3;
}

.badge-year {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-family: 'Lora', serif;
}

/* ✒️ KHỐI THÔNG ĐIỆP VĂN BẢN (TRANG TRỌNG & RÕ NÉT) */
.timeline-content {
  text-align: left;
  background: #fffdf8;
  padding: 26px 30px;
  border-radius: 6px;
  border: 1px solid #e2d3be;
  box-shadow: 0 6px 20px rgba(90, 70, 45, 0.08);
}

.timeline-date-tag {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  color: #8a2423;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  background: #f5eae0;
  padding: 3px 12px;
  border-radius: 12px;
  font-family: 'Lora', serif;
}

.timeline-title {
  font-size: 1.45rem;
  color: #2b211d;
  margin-bottom: 12px;
  font-weight: 700;
  font-family: 'Playfair Display', serif; /* Font tiêu đề mốc thời gian */
  line-height: 1.35;
  letter-spacing: 0.2px;
}

.timeline-desc {
  font-size: 0.98rem;
  color: #4a3e39;
  line-height: 1.75;
  font-family: 'Lora', serif; /* Font mô tả tiếng Việt sắc nét, chuẩn thiệp cưới */
  font-weight: 400;
}

.timeline-item.reverse {
  flex-direction: row-reverse;
}

.timeline-item.reverse .timeline-media {
  justify-content: flex-start;
}

.timeline-item.reverse .timeline-content {
  text-align: left;
}

/* 📱 RESPONSIVE MOBILES & TABLETS */
@media (max-width: 868px) {
  .notebook-spine {
    display: none;
  }

  .timeline-container::before {
    left: 28px;
  }

  .connector-line {
    display: none;
  }

  .timeline-item,
  .timeline-item.reverse {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 65px;
    margin-bottom: 50px;
  }

  .timeline-media,
  .timeline-content {
    width: 100%;
  }

  .timeline-badge {
    left: 28px;
    top: 24px;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
  }

  .badge-year {
    font-size: 0.65rem;
  }

  .timeline-item::after {
    content: '';
    position: absolute;
    left: 28px;
    top: 24px;
    width: 37px;
    height: 2px;
    border-top: 2px dashed #b5a186;
    z-index: 1;
  }

  .timeline-media {
    margin-bottom: 16px;
    justify-content: flex-start;
  }

  .printed-photo-card {
    max-width: 100%;
    transform: rotate(0deg) !important;
    padding: 10px 10px 24px 10px;
  }

  .timeline-img-frame {
    max-height: 380px;
  }

  .timeline-img-frame img {
    max-height: 380px;
  }

  .timeline-content {
    padding: 22px 20px;
  }

  .section-heading {
    font-size: 2.1rem;
  }

  .timeline-title {
    font-size: 1.3rem;
  }

  .timeline-desc {
    font-size: 0.94rem;
  }
}

@media (max-width: 480px) {
  .timeline-section {
    padding: 50px 12px;
  }
}
</style>