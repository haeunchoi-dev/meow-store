import { blockIfNotLogin } from '/views/utils/index.js';
import * as API from '/views/api/index.js';

blockIfNotLogin();

(async function getOrderSummary() {
  const jsonData = await API.get('/api/member/orders');
  const purchaseList = document.querySelector('.content-wrap');

  const purchaseListElements = jsonData.map(
    (purchaseInfo) => `
    <article class="purchase-item" id="${purchaseInfo._id}" status="${
      purchaseInfo.status
    }" >
      <div class="thumbnail-img-box">
        <img class="thumbnail" src="${
          purchaseInfo.repImgUrl
        }" alt='고양이사료썸네일'>
      </div>
      <div class="purchase-details">
        <span class="order-number">주문번호: ${purchaseInfo.number}</span>
        <span class="purchaseDate">구매 일자: ${purchaseInfo.createDate}</span>
        <h3 class="product-name">${purchaseInfo.title}</h3>
        <h3 class="price">${purchaseInfo.totalPrice.toLocaleString()}원</h3>
      </div>
      <div class="detailShipping">
        <button class="button" name="goToOrderDetailBtn">상세 내역 보기</button>
        ${
          purchaseInfo.status === '결제완료'
            ? `<button class="button cancle" name="cancleBtn">주문 취소</button>`
            : ''
        }
        
        <div class="shipping-status">${purchaseInfo.status}</div>
      </div>
    </article>
  `,
  );
  purchaseList.innerHTML = purchaseListElements.join('');

  //반복적인 요소에 이벤트 버블링을 이용해서 위임하기
  purchaseList.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.getAttribute('name') === 'goToOrderDetailBtn') {
      const orderId = target.closest('.purchase-item').getAttribute('id');
      location.href = `/order-details?id=${orderId}`;
    }

    if (target.getAttribute('name') === 'cancleBtn') {
      const orderId = target.closest('.purchase-item').getAttribute('id');
      //주문취소 api 호출
      if (confirm('주문을 취소하시겠습니까?')) {
        await API.post(`/api/member/order/${orderId}`);
        target.classList.add('none');
        target
          .closest('.purchase-item')
          .querySelector('.shipping-status').innerText = '취소';
      }
    }
  });
})();
