import * as API from '/views/api/index.js';
class CategoryModal extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  setStyle() {
    //외부 스타일 등록
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute(
      'href',
      'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css',
    );
    this.shadow.appendChild(linkElem);

    const style = document.createElement('style');

    style.textContent = `

      .modal-card-body {
            text-align: left;
      }
      
      #myUL {
        margin: 0;
        padding: 0;
      }
      
      .caret {
        cursor: pointer;
        user-select: none; /* Prevent text selection */
      }
      
      .caret::before {
        content: '\\25B6';
        color: black;
        display: inline-block;
        margin-right: 6px;
      }
      .selected-category {
        background-color: #84776e;
        padding: 4px 10px;
        color: whitesmoke;
      }
      
      .caret-down::before {
        transform: rotate(90deg);
      }
      
      .nested {
        display: none;
        margin-left: 30px;
      }
      
      .nested-li > div {
        margin-bottom: 12px;
      }
      .nested-li > div:first-child {
        margin-top: 12px;
      }
      .nested-li > div > ul > li {
        margin-top: 8px;
      }
      .active {
        display: block;
      }
      
      .modal-card-foot {
        justify-content: center;
      }
      
      .lowCateLi {
        cursor: pointer;
      }
      .lowCateLi.selected-category {
        background-color: #a39c97;
      }
      
        `;
    this.shadow.appendChild(style);
  }

  render() {
    const template = `
    <button class="button is-warning js-modal-trigger is-small">
        카테고리 찾기
    </button>
    <div class="modal" id="modal-category">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Category</p>
            <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
            <ul id="myUL">
                <li class="myUL-li">
                <span>전체</span>
                <ul class="nested active">
                    <li class="nested-li"></li>
                </ul>
                </li>
            </ul>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success" id="modalSelectBtn"  >선택</button>
            <!-- <button class="button">취소</button> -->
            </footer>
        </div>
    </div>
        `;

    this.shadow.innerHTML = template;
    this.setStyle();
    this.setEvent();
  }

  setEvent() {
    const self = this;
    const $target = self.shadow.getElementById('modal-category');
    getCateList();

    self.shadow
      .getElementById('modalSelectBtn')
      .addEventListener('click', () => {
        const category = self.shadow.querySelector('.caret.selected-category');

        if (!category) {
          alert('카테고리를 선택해 주세요');
          return false;
        }

        const subcategory = self.shadow.querySelector(
          '.lowCateLi.selected-category',
        );

        let result = {
          categoryId: category.getAttribute('id'),
          categoryName: category.innerText.trim(),
        };
        let name = result.categoryName;

        if (subcategory) {
          result.subcategoryName = subcategory.innerText.trim();
          name += ` > ${result.subcategoryName}`;
          result.subcategoryId = subcategory.getAttribute('id');
        }

        result.name = name;
        self._handleModalCloseCallback(result);
        closeAllModals();
      });

    self.shadow
      .querySelector('.js-modal-trigger')
      .addEventListener('click', () => {
        openModal($target);
      });

    (self.shadow.querySelectorAll('.modal-card-head .delete') || []).forEach(
      ($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
          closeModal($target);
        });
      },
    );

    async function getCateList() {
      const result = await API.get('/api/admin/subcategory');

      const nested = self.shadow.querySelector('.nested-li');
      result.data.forEach((item) => {
        nested.insertAdjacentHTML(
          'beforeend',
          `<div>
              <span class="caret" id=${item._id}>${item.categoryName}</span>
              <ul class="nested">
                ${item.data
                  .map(
                    (items) =>
                      `<li class="lowCateLi" id=${items._id} category_id=${item._id}>${items.subCategoryName}</li>`,
                  )
                  .join('')}
              </ul>
              </div>`,
        );
      });

      nodeSet(self.shadow.querySelectorAll('.caret'));
    }

    function nodeSet(togglers) {
      togglers.forEach((toggler) => {
        toggler.addEventListener('click', arrowClick);
      });
      lowCateClick();
    }

    function arrowClick() {
      const selected = self.shadow.querySelectorAll('.selected-category');
      selected.forEach((item) => {
        item.classList.remove('selected-category');
      });

      // 토글 클래스 추가
      this.parentElement.querySelector('.nested').classList.toggle('active');
      this.classList.toggle('caret-down');
      this.classList.add('selected-category');
    }

    // 하위 카테고리를 클릭 했을 때 이벤트
    function lowCateClick() {
      const lowCateItem = self.shadow.querySelectorAll('.lowCateLi');
      lowCateItem.forEach((item) => {
        item.addEventListener('click', addClassToLowCate);
      });
    }

    function addClassToLowCate() {
      const selected = self.shadow.querySelectorAll('.selected-category');
      selected.forEach((item) => {
        item.classList.remove('selected-category');
      });
      const categoryId = this.getAttribute('category_id');
      const category = self.shadow.getElementById(categoryId);
      category.classList.add('selected-category');
      this.classList.add('selected-category');
    }

    function openModal($el) {
      $el.classList.add('is-active');
    }

    function closeModal($el) {
      $el.classList.remove('is-active');
    }

    function closeAllModals() {
      (self.shadow.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  }

  set modalCallback(callback) {
    this._handleModalCloseCallback = callback;
  }
}
customElements.define('category-modal', CategoryModal);
