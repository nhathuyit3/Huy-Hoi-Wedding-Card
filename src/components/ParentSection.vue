<template>
  <section class="section parents-section full-width-section">
    <!-- Nếp gấp gáy sổ hoài cổ -->
    <div class="notebook-spine"></div>

    <div class="container-inner">
      <!-- HÀNG TRÊN: 2 THẺ NHÀ TRAI & NHÀ GÁI (KHUNG MẠ VÀNG VINTAGE) -->
      <div class="parents-cards-wrapper">
        <!-- Nhà Trai -->
        <div class="parent-card">
          <div class="card-border-inner">
            <p class="card-title">HÔN PHỐI NHÀ TRAI</p>
            <div class="title-accent-line"></div>
            <p class="parent-line">
              Ông: <strong>{{ data.groom?.family?.father || 'HỒ NGÔ ANH TUẤN' }}</strong>
            </p>
            <p class="parent-line">
              Bà: <strong>{{ data.groom?.family?.mother || 'NGUYỄN THỊ THANH HÒA' }}</strong>
            </p>
            <p class="address-text">
              <span class="icon-pin">📍</span> {{ data.groom?.family?.address || 'Điện Biên Phủ, P. Thanh Khê, TP. Đà Nẵng' }}
            </p>
          </div>
        </div>

        <!-- Biểu tượng Trái Tim Hoàng Gia Ở Giữa 2 Thẻ -->
        <div class="cards-divider-badge">
          <span>囍</span>
        </div>

        <!-- Nhà Gái -->
        <div class="parent-card">
          <div class="card-border-inner">
            <p class="card-title">HÔN PHỐI NHÀ GÁI</p>
            <div class="title-accent-line"></div>
            <p class="parent-line">
              Ông: <strong>{{ data.bride?.family?.father || 'NGUYỄN TƯ' }}</strong>
            </p>
            <p class="parent-line">
              Bà: <strong>{{ data.bride?.family?.mother || 'NGUYỄN THỊ XANH' }}</strong>
            </p>
            <p class="address-text">
              <span class="icon-pin">📍</span> {{ data.bride?.family?.address || 'Tổ 9, Thôn 5, X. Tiên Phước, TP. Đà Nẵng' }}
            </p>
          </div>
        </div>
      </div>

      <!-- HÀNG DƯỚI: THÔNG TIN LỄ THÀNH HÔN SANG TRỌNG -->
      <div class="announcement-block">
        <div class="royal-crest-icon">✤</div>
        <p class="announcement-intro">TRÂN TRỌNG BÁO TIN — LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>

        <!-- Khối Tên Cô Dâu Chú Rể Nổi Bật -->
        <div class="couple-names-wrapper">
          <div class="person-box">
            <h2 class="person-fullname">{{ data.groom?.fullName || 'Hồ Nhật Huy' }}</h2>
            <span class="role-badge">{{ data.groom?.role || 'ÚT NAM' }}</span>
          </div>

          <div class="ampersand-divider">&</div>

          <div class="person-box">
            <h2 class="person-fullname">{{ data.bride?.fullName || 'Đỗ Thị Duyên' }}</h2>
            <span class="role-badge">{{ data.bride?.role || 'TRƯỞNG NỮ' }}</span>
          </div>
        </div>

        <!-- Khung Thời Gian Cử Hành -->
        <div class="ceremony-time-card">
          <div class="ceremony-header-badge">
            <p class="ceremony-location">{{ data.ceremonyInfo?.title || 'CỬ HÀNH TẠI TƯ GIA' }}</p>
          </div>
          <p class="ceremony-date">
            Vào lúc <strong>{{ data.ceremonyInfo?.time || '09 giờ 30' }} — {{ data.ceremonyInfo?.dayOfWeek || 'Thứ Hai' }}</strong>
          </p>
          <div class="solar-date-highlight">
            NGÀY {{ data.ceremonyInfo?.date || '20 . 12 . 2026' }}
          </div>
          <p class="lunar-date">
            <i>(Nhằm ngày {{ data.ceremonyInfo?.lunarDate || '21/05 BÍNH NGỌ' }})</i>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ParentsSection',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {}
  }
}
</script>

<style scoped>
/* Import Font Tiếng Việt Trang Trọng & Serif Luxury */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,500..800;1,500..800&display=swap');

.parents-section {
  padding: 90px 20px;
  /* Background phong cách giấy hoài cổ đồng bộ */
  background-color: #f7f1e3;
  background-image: 
    linear-gradient(rgba(195, 176, 145, 0.22) 1px, transparent 1px),
    radial-gradient(rgba(163, 138, 99, 0.08) 1px, transparent 0);
  background-size: 100% 30px, 16px 16px;
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 0 100px rgba(110, 85, 50, 0.12);
  font-family: 'Lora', serif;
}

/* Gáy sổ vintage */
.notebook-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3%;
  width: 2px;
  border-left: 2px dashed rgba(163, 42, 41, 0.35);
  pointer-events: none;
}

.container-inner {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Thẻ Nhà Trai & Nhà Gái Sang Trọng */
.parents-cards-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
  position: relative;
}

.parent-card {
  flex: 1;
  max-width: 420px;
  background: #fffdf9;
  border: 1px solid #e0d1ba;
  padding: 6px; /* Khoảng cách tạo khung đôi */
  border-radius: 4px;
  box-shadow: 0 12px 30px rgba(85, 65, 40, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.parent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(122, 28, 27, 0.15);
}

.card-border-inner {
  border: 1px dashed #cbb698;
  padding: 24px 20px;
  text-align: center;
  background: #ffffff;
  height: 100%;
}

.card-title {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: #7a1c1b;
  font-weight: 700;
  margin-bottom: 6px;
  font-family: 'Playfair Display', serif;
}

.title-accent-line {
  width: 40px;
  height: 2px;
  background: #cbb698;
  margin: 0 auto 16px auto;
}

.parent-line {
  font-size: 0.95rem;
  color: #554842;
  margin-bottom: 8px;
  line-height: 1.5;
}

.parent-line strong {
  color: #2b211d;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.address-text {
  font-size: 0.84rem;
  color: #78685f;
  margin-top: 14px;
  line-height: 1.5;
  border-top: 1px solid #f2e7d8;
  padding-top: 10px;
}

.icon-pin {
  font-size: 0.75rem;
  margin-right: 2px;
}

/* Huy Hiệu Song Hỷ Nối Ở Giữa */
.cards-divider-badge {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8a2423 0%, #681716 100%);
  color: #f7f1e3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: 0 0 0 4px #f7f1e3, 0 6px 16px rgba(100, 30, 25, 0.25);
  z-index: 3;
  flex-shrink: 0;
}

/* Khối Thông Báo & Tên Cô Dâu Chú Rể */
.announcement-block {
  text-align: center;
  background: #fffdf8;
  padding: 45px 35px;
  border-radius: 8px;
  border: 1px solid #e2d3be;
  box-shadow: 0 10px 30px rgba(90, 70, 45, 0.08);
}

.royal-crest-icon {
  color: #b89759;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.announcement-intro {
  font-size: 0.8rem;
  letter-spacing: 3.5px;
  color: #8c7355;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: uppercase;
}

/* Cặp Đôi Cô Dâu Chú Rể */
.couple-names-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 35px;
}

.person-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.person-fullname {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2b211d;
  line-height: 1.2;
}

.role-badge {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.72rem;
  letter-spacing: 2px;
  color: #7a1c1b;
  font-weight: 700;
  background: #f5eae0;
  padding: 3px 12px;
  border-radius: 12px;
}

.ampersand-divider {
  font-family: 'Great Vibes', cursive;
  font-size: 4rem;
  color: #b89759;
  line-height: 0.8;
  padding: 0 10px;
}

/* Thẻ Thời Gian Cử Hành Lễ */
.ceremony-time-card {
  max-width: 550px;
  margin: 0 auto;
  border-top: 2px dashed #e0d1ba;
  padding-top: 28px;
}

.ceremony-header-badge {
  display: inline-block;
  margin-bottom: 12px;
}

.ceremony-location {
  font-size: 0.85rem;
  letter-spacing: 2.5px;
  color: #7a1c1b;
  font-weight: 700;
  text-transform: uppercase;
}

.ceremony-date {
  font-size: 1.05rem;
  color: #4a3e39;
  margin-bottom: 12px;
}

.ceremony-date strong {
  color: #2b211d;
}

.solar-date-highlight {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #7a1c1b;
  letter-spacing: 3px;
  margin: 12px 0;
  background: linear-gradient(90deg, transparent, #f7ede0, transparent);
  padding: 6px 0;
}

.lunar-date {
  font-size: 0.9rem;
  color: #78685f;
}

/* Responsive Mobile & Tablet */
@media (max-width: 868px) {
  .notebook-spine {
    display: none;
  }

  .parents-cards-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  .parent-card {
    max-width: 100%;
    width: 100%;
  }

  .cards-divider-badge {
    margin: -10px 0;
  }

  .couple-names-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .ampersand-divider {
    font-size: 3rem;
    margin: 5px 0;
  }

  .person-fullname {
    font-size: 2rem;
  }

  .announcement-block {
    padding: 30px 18px;
  }

  .solar-date-highlight {
    font-size: 1.3rem;
  }
}
</style>