<template>
  <section class="section venue-section full-width-section">
    <!-- HIỆU ỨNG ĐỐM SÁNG BOKEH DI CHUYỂN -->
    <div class="bokeh-container">
      <div 
        v-for="n in 25" 
        :key="n" 
        class="bokeh-dot"
        :style="getBokehStyle(n)"
      ></div>
    </div>

    <!-- KHUNG NỘI DUNG CHÍNH (THIẾT KẾ VIỀN KÉP) -->
    <div class="venue-card">
      <div class="card-inner-border">
        <div class="venue-content-grid">
          
          <!-- CỘT TRÁI: THÔNG TIN TIỆC CƯỚI -->
          <div class="info-side">
            <!-- BIỂU TƯỢNG 囍 -->
            <div class="xi-badge">
              <span>囍</span>
            </div>

            <p class="sub-title">TIỆC CƯỚI</p>
            <p class="invitation-text">Đến dự buổi tiệc chung vui cùng gia đình chúng tôi tại</p>

            <h2 class="venue-name">{{ venueInfo.name || 'PHÌ LŨ' }}</h2>
            <p class="hall-name">{{ venueInfo.hall || 'SẢNH PEARL' }}</p>

            <p class="address-title">{{ venueInfo.subtitle || 'Trung tâm Hội nghị Tiệc cưới' }}</p>
            <p class="address-detail">
              {{ venueInfo.address || 'Lô 1-2-3 Khu công viên Bắc Tượng Đài, đường 2/9, TP. Đà Nẵng' }}
            </p>

            <!-- KHUNG THỜI GIAN -->
            <div class="time-container">
              <div class="time-block">
                <span class="time-val">{{ venueInfo.time || '17:00' }}</span>
                <span class="time-lbl">VÀO LÚC</span>
              </div>
              <div class="time-divider"></div>
              <div class="time-block">
                <span class="time-val">{{ venueInfo.date || '03.08.2026' }}</span>
                <span class="time-lbl">{{ venueInfo.lunarDate || '21/06 BÍNH NGỌ' }}</span>
              </div>
            </div>

            <!-- NÚT HÀNH ĐỘNG -->
            <div class="action-buttons">
              <button class="btn btn-calendar" @click="addToCalendar">
                THÊM VÀO LỊCH
              </button>
              <a 
                :href="mapUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-map"
              >
                CHỈ ĐƯỜNG
              </a>
            </div>
          </div>

          <!-- CỘT PHẢI: BẢN ĐỒ GOOGLE MAPS EMBED -->
          <div class="map-side">
            <div class="map-wrapper">
              <iframe
                :src="mapEmbedSrc"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'VenueSection',
  props: {
    venueInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const mapUrl = computed(() => {
      return props.venueInfo?.mapUrl || 'https://maps.google.com/?q=Trung+tam+Hoi+nghi+Tiec+cuoi+Phi+Lu+Da+Nang'
    })

    const mapEmbedSrc = computed(() => {
      return props.venueInfo?.mapEmbedSrc || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110375936306!2d108.2201389!3d16.0597371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c41a293f0b%3A0xb3634177b94d137b!2zVHJ1bmcgdMOibSBI4buZaSBuZ2jhu4sgVGnhu4djIGPGsOG7m2kgUGjDrCBMxak!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn'
    })

    // Sinh vị trí, kích thước & animation ngẫu nhiên cho các đốm Bokeh
    const getBokehStyle = (index) => {
      const size = Math.floor(Math.random() * 45) + 15 // Kích thước từ 15px - 60px
      const left = Math.floor(Math.random() * 100) // Vị trí ngang %
      const top = Math.floor(Math.random() * 100) // Vị trí dọc %
      const duration = Math.floor(Math.random() * 10) + 8 // Thời gian animation 8s - 18s
      const delay = Math.floor(Math.random() * 5) // Trễ 0s - 5s
      const opacity = (Math.random() * 0.4 + 0.25).toFixed(2) // Độ trong suốt 0.25 - 0.65

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: opacity
      }
    }

    const addToCalendar = () => {
      const title = encodeURIComponent('Đám cưới Nhật Huy & Duyên Đỗ')
      const details = encodeURIComponent('Tiệc cưới tại Trung tâm Hội nghị Tiệc cưới Phì Lũ - Sảnh Pearl')
      const location = encodeURIComponent('Trung tâm Hội nghị Tiệc cưới Phì Lũ, Lô 1-2-3 Khu công viên Bắc Tượng Đài, đường 2/9, TP. Đà Nẵng')
      const startDate = '20260803T100000Z'
      const endDate = '20260803T140000Z'

      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`
      window.open(calendarUrl, '_blank')
    }

    return {
      mapUrl,
      mapEmbedSrc,
      getBokehStyle,
      addToCalendar
    }
  }
}
</script>

<style scoped>
/* KHUNG NGOÀI CÙNG NỀN ĐỎ ĐÔ ĐẬM SANG TRỌNG */
.venue-section {
  position: relative;
  background: radial-gradient(circle at center, #63121d 0%, #3a080d 100%);
  padding: 60px 20px;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
}

/* CONTAINER ĐỐM SÁNG BOKEH */
.bokeh-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.bokeh-dot {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 206, 135, 0.9) 0%, rgba(235, 140, 60, 0.4) 60%, rgba(255, 255, 255, 0) 100%);
  filter: blur(4px);
  animation: floatBokeh infinite ease-in-out;
}

@keyframes floatBokeh {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-25px) scale(1.2);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

/* THIẾT KẾ CARD NỘI DUNG VỚI VIỀN VIỀN KÉP */
.venue-card {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px;
  background-color: rgba(58, 8, 13, 0.4);
  backdrop-filter: blur(2px);
}

.card-inner-border {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px 30px;
}

/* BỐ CỤC 2 CỘT (CỘT THÔNG TIN & BẢN ĐỒ) */
.venue-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
}

/* CỘT TRÁI - THÔNG TIN */
.info-side {
  text-align: center;
}

.xi-badge {
  width: 46px;
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 1.2rem;
  color: #f7e1b5;
}

.sub-title {
  font-size: 0.8rem;
  letter-spacing: 4px;
  color: #e2c08d;
  font-weight: 600;
  margin-bottom: 8px;
}

.invitation-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 12px;
  font-weight: 300;
}

.venue-name {
  font-family: 'Times New Roman', Times, serif;
  font-size: 3.2rem;
  font-weight: 400;
  letter-spacing: 3px;
  color: #ffffff;
  margin: 0 0 5px;
  line-height: 1.1;
}

.hall-name {
  font-size: 0.9rem;
  letter-spacing: 3px;
  color: #e2c08d;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.address-title {
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 4px;
  font-weight: 500;
}

.address-detail {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin-bottom: 25px;
}

/* THỜI GIAN GIỜ/NGÀY CÓ KHUNG ĐƯỜNG KẺ */
.time-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 0;
  margin-bottom: 25px;
}

.time-block {
  display: flex;
  flex-direction: column;
}

.time-val {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff;
}

.time-lbl {
  font-size: 0.68rem;
  color: #e2c08d;
  letter-spacing: 1px;
  margin-top: 4px;
}

.time-divider {
  width: 1px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
}

/* NÚT BẤM CẠNH NHAU */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-calendar {
  background-color: #d1ab68;
  color: #2b060a;
  border: 1px solid #d1ab68;
}

.btn-calendar:hover {
  background-color: #e8c485;
}

.btn-map {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.btn-map:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #ffffff;
}

/* CỘT PHẢI - GOOGLE MAPS EMBED */
.map-side {
  height: 100%;
  min-height: 380px;
}

.map-wrapper {
  width: 100%;
  height: 100%;
  min-height: 380px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

/* RESPONSIVE MOBILE */
@media (max-width: 850px) {
  .venue-content-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .card-inner-border {
    padding: 30px 15px;
  }

  .venue-name {
    font-size: 2.5rem;
  }

  .map-side, .map-wrapper {
    min-height: 300px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>