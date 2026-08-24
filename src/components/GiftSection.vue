<template>
  <section class="section gift-section full-width-section">
    <div class="gift-container">
      <!-- TIÊU ĐỀ HỘP MỪNG CƯỚI -->
      <p class="section-subheading">HỘP MỪNG CƯỚI ONLINE</p>
      <p class="gift-description">
        Sự hiện diện của quý khách là món quà quý giá nhất.<br />
        Quý khách cũng có thể gửi mừng cưới đến chú rể hoặc cô dâu qua mã QR bên dưới.
      </p>

      <!-- KHUNG MÃ QR CHIA 2 CỘT -->
      <div class="qr-grid">
        <!-- CỘT CHÚ RỂ -->
        <div class="qr-card">
          <div class="card-badge">CHÚ RỂ</div>
          <div class="qr-image-wrapper">
            <img 
              :src="groomQrUrl" 
              alt="Mã QR Chú Rể" 
              loading="lazy"
            />
          </div>
          <div class="account-details">
            <p class="account-name">{{ groomInfo.accountName || 'NHA T HUY' }}</p>
            <p class="bank-name">{{ groomInfo.bankName || 'MB Bank' }}</p>
            <p class="account-number">{{ groomInfo.accountNumber || '0123456789' }}</p>
          </div>
        </div>

        <!-- CỘT CÔ DÂU -->
        <div class="qr-card">
          <div class="card-badge bride">CÔ DÂU</div>
          <div class="qr-image-wrapper">
            <img 
              :src="brideQrUrl" 
              alt="Mã QR Cô Dâu" 
              loading="lazy"
            />
          </div>
          <div class="account-details">
            <p class="account-name">{{ brideInfo.accountName || 'DUYEN DO' }}</p>
            <p class="bank-name">{{ brideInfo.bankName || 'Vietcombank' }}</p>
            <p class="account-number">{{ brideInfo.accountNumber || '9876543210' }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'GiftSection',
  props: {
    giftInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const groomInfo = computed(() => props.giftInfo?.groom || {})
    const brideInfo = computed(() => props.giftInfo?.bride || {})

    // Hàm tự động tạo URL mã QR VietQR chuẩn
    const generateQrUrl = (bankName, accountNumber, accountName) => {
      const bank = bankName || 'MB'
      const acc = accountNumber || '0123456789'
      const name = encodeURIComponent(accountName || '')
      
      // Sử dụng API VietQR chuẩn
      return `https://img.vietqr.io/image/${bank}-${acc}-compact.png?accountName=${name}`
    }

    const groomQrUrl = computed(() => {
      if (groomInfo.value.qrCode) return groomInfo.value.qrCode
      return generateQrUrl(
        groomInfo.value.bankName,
        groomInfo.value.accountNumber,
        groomInfo.value.accountName
      )
    })

    const brideQrUrl = computed(() => {
      if (brideInfo.value.qrCode) return brideInfo.value.qrCode
      return generateQrUrl(
        brideInfo.value.bankName,
        brideInfo.value.accountNumber,
        brideInfo.value.accountName
      )
    })

    return {
      groomInfo,
      brideInfo,
      groomQrUrl,
      brideQrUrl
    }
  }
}
</script>

<style scoped>
.gift-section {
  padding: 70px 20px 50px;
  background-color: #faf8f5;
  text-align: center;
  color: #333333;
}

.gift-container {
  max-width: 780px;
  margin: 0 auto;
}

.section-subheading {
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: #c09c5d;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.gift-description {
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 400;
}

/* KHUNG LƯỚI CHIA 2 CỘT */
.qr-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.qr-card {
  flex: 1;
  max-width: 320px;
  background: #ffffff;
  padding: 24px 20px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qr-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(192, 156, 93, 0.15);
}

.card-badge {
  display: inline-block;
  padding: 4px 14px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  border-radius: 20px;
  margin-bottom: 15px;
}

.card-badge.bride {
  background-color: #a32a29;
}

.qr-image-wrapper {
  background: #faf8f5;
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 15px;
}

.qr-image-wrapper img {
  width: 180px;
  height: 180px;
  display: block;
  object-fit: contain;
}

.account-details {
  border-top: 1px dashed #e5e5e5;
  padding-top: 12px;
}

.account-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.bank-name {
  font-size: 0.8rem;
  color: #c09c5d;
  font-weight: 600;
  margin-bottom: 2px;
}

.account-number {
  font-size: 0.85rem;
  color: #666666;
  font-family: monospace;
  letter-spacing: 1px;
}

/* RESPONSIVE MOBILE */
@media (max-width: 680px) {
  .qr-grid {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .qr-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>