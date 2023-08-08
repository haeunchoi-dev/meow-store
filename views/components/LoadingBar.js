(function () {
  if (customElements.get('loading-bar')) {
    // Custom element already defined, no need to redefine
    return;
  }
  class LoadingBar extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
    }

    setStyle() {
      const style = document.createElement('style');

      style.textContent = `
        .loading-wrapper {
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            text-align: center;
            background-color: rgb(94 93 92 / 34%);
        }
        
        .loading {
            width: 50px;
            height: 50px;
            display: inline-block;
            position: absolute;
            top: 50%;
        }
        .loading,
        .loading:before,
        .loading:after {
            animation: 1s infinite ease-in-out;
        }
        .loading:before,
        .loading:after {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .loading-bar {
            animation: loading-bar-1 1.5s infinite linear;
        }
        .loading-bar:before,
        .loading-bar:after {
            content: '';
            margin: -25px 0 0 -25px;
            top: 50%;
            left: 50%;
            background-color: rgb(239 235 230 / 67%);
            animation-name: loading-bar-2;
        }
        .loading-bar:after {
            animation-direction: reverse;
        }
        
        @keyframes loading-bar-1 {
            0% {
            transform: rotate(0deg);
            }
            100% {
            transform: rotate(360deg);
            }
        }
        
        @keyframes loading-bar-2 {
            0% {
            transform: scale(0.2);
            left: 0%;
            }
            50% {
            transform: scale(1);
            left: 50%;
            }
            100% {
            transform: scale(0.2);
            left: 100%;
            }
        }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const template = `
    <div class="loading-wrapper">
      <div class="loading loading-bar"></div>
    </div>
      `;

      this.shadow.innerHTML = template;
      this.setStyle();
    }
  }
  customElements.define('loading-bar', LoadingBar);
})();

export const addLoadingBar = () => {
  const loadingBar = document.createElement('loading-bar');
  document.body.appendChild(loadingBar);
};

export const removeLoadingBar = () => {
  const loadingBar = document.querySelector('loading-bar');
  document.body.removeChild(loadingBar);
};
