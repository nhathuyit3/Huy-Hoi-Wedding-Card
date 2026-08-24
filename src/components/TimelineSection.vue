<template>
  <section class="section timeline-section full-width-section">
    <div class="falling-hearts-container" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="falling-heart" :style="getHeartStyle(n)">♥</span>
    </div>
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
          <!-- Cột Hình Ảnh -->
          <div class="timeline-media">
            <div class="timeline-img-frame">
              <img :src="item.image" :alt="item.title" />
            </div>
          </div>

          <!-- Mốc Tròn Kỷ Niệm Chính Giữa -->
          <div class="timeline-badge">
            <span class="badge-year">{{ item.date }}</span>
          </div>

          <!-- Cột Nội Dung Văn Bản -->
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
    // Tạo style ngẫu nhiên cho từng trái tim rơi
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
.timeline-section {
  padding: 80px 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.falling-hearts-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.falling-heart {
  position: absolute;
  top: -30px;
  color: rgba(163, 42, 41, 0.25);
  animation: heart-fall linear infinite;
}

@keyframes heart-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(1000px) rotate(360deg);
    opacity: 0;
  }
}

.container-inner {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

/* Tiêu đề */
.timeline-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-subheading {
  font-size: 0.8rem;
  letter-spacing: 3px;
  color: #888;
  font-weight: 600;
  margin-bottom: 6px;
}

.section-heading {
  font-size: 2.5rem;
  color: #a32a29;
  font-weight: normal;
}

.title-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.heart-icon {
  color: #a32a29;
  font-size: 1.2rem;
}

/* Cấu trúc Timeline */
.timeline-container {
  position: relative;
  padding: 20px 0;
}

/* Đường kẻ dọc chính giữa */
.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: #e5dec9;
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
  position: relative;
}

.timeline-media,
.timeline-content {
  width: 42%;
}

.timeline-media {
  display: flex;
  justify-content: flex-end;
}

/* Khung Hình Ảnh */
.timeline-img-frame {
  width: 100%;
  max-width: 380px;
  height: 260px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 4px solid #ffffff;
}

.timeline-img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.timeline-img-frame:hover img {
  transform: scale(1.05);
}

/* Nút Tròn Mốc Năm Chính Giữa */
.timeline-badge {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a32a29 0%, #821f1e 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(163, 42, 41, 0.3);
  border: 3px solid #ffffff;
  z-index: 2;
}

.badge-year {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Nội dung văn bản */
.timeline-content {
  text-align: left;
  background: #fbf9f6;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #eae5d9;
}

.timeline-date-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #a32a29;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
}

.timeline-title {
  font-size: 1.4rem;
  color: #222;
  margin-bottom: 10px;
}

.timeline-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

/* Đảo chiều cho item chẵn (Reverse) */
.timeline-item.reverse {
  flex-direction: row-reverse;
}

.timeline-item.reverse .timeline-media {
  justify-content: flex-start;
}

.timeline-item.reverse .timeline-content {
  text-align: right;
}

/* Responsive Mobile & Tablet */
@media (max-width: 768px) {
  .timeline-container::before {
    left: 24px;
  }

  .timeline-item,
  .timeline-item.reverse {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 60px;
    margin-bottom: 40px;
  }

  .timeline-media,
  .timeline-content {
    width: 100%;
  }

  .timeline-badge {
    left: 24px;
    top: 0;
    width: 40px;
    height: 40px;
  }

  .badge-year {
    font-size: 0.65rem;
  }

  .timeline-img-frame {
    max-width: 100%;
    height: 220px;
    margin-bottom: 16px;
  }

  .timeline-item.reverse .timeline-content {
    text-align: left;
  }

  .section-heading {
    font-size: 2rem;
  }
}
</style>