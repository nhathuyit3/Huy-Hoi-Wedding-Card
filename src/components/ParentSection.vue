<template>
  <section class="section parents-section full-width-section">
    <div class="container-inner">
      <!-- HÀNG TRÊN: 2 THẺ NHÀ TRAI & NHÀ GÁI -->
      <div class="parents-cards-wrapper">
        <!-- Nhà Trai -->
        <div class="parent-card">
          <p class="card-title">NHÀ TRAI</p>
          <p class="parent-line">
            Ông: <strong>{{ data.groom?.family?.father || 'HỒ NGÔ ANH TUẤN' }}</strong>
          </p>
          <p class="parent-line">
            Bà: <strong>{{ data.groom?.family?.mother || 'NGUYỄN THỊ THANH HÒA' }}</strong>
          </p>
          <p class="address-text">
            {{ data.groom?.family?.address || 'Điện Biên Phủ, P. Thanh Khê, TP. Đà Nẵng' }}
          </p>
        </div>

        <!-- Nhà Gái -->
        <div class="parent-card">
          <p class="card-title">NHÀ GÁI</p>
          <p class="parent-line">
            Ông: <strong>{{ data.bride?.family?.father || 'NGUYỄN TƯ' }}</strong>
          </p>
          <p class="parent-line">
            Bà: <strong>{{ data.bride?.family?.mother || 'NGUYỄN THỊ XANH' }}</strong>
          </p>
          <p class="address-text">
            {{ data.bride?.family?.address || 'Tổ 9, Thôn 5, X. Tiên Phước, TP. Đà Nẵng' }}
          </p>
        </div>
      </div>

      <!-- HÀNG DƯỚI: THÔNG TIN LỄ THÀNH HÔN & CÔ DÂU CHÚ RỂ -->
      <div class="announcement-block">
        <p class="announcement-intro">TRÂN TRỌNG BÁO TIN — LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>

        <!-- Tên Chú Rể -->
        <h2 class="person-fullname">{{ data.groom?.fullName || 'Hồ Nhật Huy' }}</h2>

        <!-- Thứ tự gia đình -->
        <p class="roles-line">
          <span class="role-item">{{ data.groom?.role || 'ÚT NAM' }}</span>
          <span class="heart-dot">♥</span>
          <span class="role-item">{{ data.bride?.role || 'TRƯỞNG NỮ' }}</span>
        </p>

        <!-- Tên Cô Dâu -->
        <h2 class="person-fullname">{{ data.bride?.fullName || 'Đỗ Thị Duyên' }}</h2>

        <!-- Thời gian cử hành -->
        <div class="ceremony-time">
          <p class="ceremony-location">{{ data.ceremonyInfo?.title || 'Cử hành tại tư gia' }}</p>
          <p class="ceremony-date">
            Vào lúc <strong>{{ data.ceremonyInfo?.time || '09 giờ 30' }} — {{ data.ceremonyInfo?.dayOfWeek || 'Thứ Hai' }}, ngày {{ data.ceremonyInfo?.date || '20.12.2026' }}</strong>
          </p>
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
.parents-section {
  padding: 70px 20px;
  background-color: #fbf9f6;
  display: flex;
  justify-content: center;
}

.container-inner {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

/* Thẻ Nhà Trai & Nhà Gái */
.parents-cards-wrapper {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 50px;
}

.parent-card {
  flex: 1;
  max-width: 400px;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.card-title {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #777777;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.parent-line {
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 4px;
}

.parent-line strong {
  color: #111111;
  font-weight: 700;
}

.address-text {
  font-size: 0.82rem;
  color: #777777;
  margin-top: 8px;
  line-height: 1.4;
}

/* Khối Thông Báo & Tên Cô Dâu Chú Rể */
.announcement-block {
  text-align: center;
}

.announcement-intro {
  font-size: 0.72rem;
  letter-spacing: 2.5px;
  color: #c09c5d; /* Màu vàng đồng */
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: uppercase;
}

.person-fullname {
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.2;
}

.roles-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 12px 0;
}

.role-item {
  font-size: 0.68rem;
  letter-spacing: 2px;
  color: #888888;
  font-weight: 600;
  text-transform: uppercase;
}

.heart-dot {
  color: #a32a29;
  font-size: 0.65rem;
}

/* Khung Thời Gian Cử Hành */
.ceremony-time {
  margin-top: 36px;
}

.ceremony-location {
  font-size: 0.85rem;
  color: #666666;
  margin-bottom: 6px;
}

.ceremony-date {
  font-size: 0.92rem;
  color: #333333;
  margin-bottom: 6px;
}

.ceremony-date strong {
  color: #111111;
  font-weight: 700;
}

.lunar-date {
  font-size: 0.8rem;
  color: #888888;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .parents-cards-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }

  .parent-card {
    width: 100%;
    max-width: 100%;
    padding: 20px 16px;
  }

  .person-fullname {
    font-size: 2.2rem;
  }

  .announcement-intro {
    font-size: 0.65rem;
    letter-spacing: 1.5px;
  }
}
</style>