class Modal {
    constructor(params) {
        // создаем объект с настройками для модального окна
        this.settings = Object.assign({
            id: params.id,
            title: params.title,
            message: params.message,
            closeButton: true,
            closeButtonText: params.closeButtonText,
            modalPosition: params.modalPosition,
            overlayColor: params.overlayColor
        }, params)

        const { title, message, closeButton, closeButtonText, modalPosition, id }
            = params;

        this.slideInDown = 'slideInDown 500ms ease';
        this.slideOutTop = 'slide-out-top 500ms ease';
        this.slideInBottom = 'slideInBottom 500ms ease'
        this.slideInTop = 'slideInTop 500ms ease';

        // Получаем доступ к app, чтобы потом внутрь поместить нашу модаку
        this.app = document.getElementById('app');

        // Создадим наш оверлей, затемнение, когда появляется модалка.
        this.overlay = this.createElement('div', 'modal-overlay');

        // Создаем сам модальное окно
        this.modal = this.createElement('div', 'modal-content');

        // Внутри модалки создадим title
        this.title = this.createElement('h1', 'modal-title');
        // Зададим титул через наши настройки.
        this.title.textContent = title

        // помещает наш титул внутрь модалки.
        this.modal.appendChild(this.title)

        // Создаем message описание
        this.message = this.createElement('p', 'modal-message');
        this.message.textContent = message;

        this.modal.appendChild(this.message)

        // вставляем внутрь overlay нашу модалку.
        this.overlay.appendChild(this.modal)

        // Теперь попробуем через дата-атрибут в теге получить доступ к нашей модалке.
        if ( params.id ) {
            this._openBtn = document.querySelector(`[data-modal-id=${id}]`);
            this._openBtn.addEventListener('click', this.open.bind(this))
        }

        let   T = 'top',
              TL = 'topLeft',
              TR = 'topRight',
              C = 'center',
              B = 'bottom',
              BR = 'bottomRight',
              BL = 'bottomLeft'

        // Делаем проверку, если true, то отрисовываем кнопку.
        if ( closeButton ) {
            this.closeButton = this.createElement('button', 'modal-close-button')
            this.closeButton.textContent = closeButtonText;

            // Вешаем обработчик события при нажатии на закрыть, закрываем окно.
            this.closeButton.addEventListener('click', () => {

                switch (modalPosition) {
                    case T:
                        this.modal.style.animation
                            = position.closeModal(this.slideOutTop)

                        return this.close()
                    case TL:
                        this.modal.style.animation
                            = position.closeModal(this.slideOutTop)
                        return this.close()
                    case TR:
                        this.modal.style.animation
                            = position.closeModal(this.slideOutTop)
                        return this.close()
                    case C:
                        this.modal.style.animation
                            = position.closeModal(this.slideOutTop)
                        return this.close()

                    case B:
                        this.modal.style.animation
                            = position.closeModal(this.slideInBottom)
                        return this.close()
                    case BL:
                        this.modal.style.animation
                            = position.closeModal(this.slideInBottom)
                        return this.close()
                    case BR:
                        this.modal.style.animation
                            = position.closeModal(this.slideInBottom)
                        return this.close()
                    default:
                        this.modal.style.animation
                            = position.closeModal(this.slideOutTop)
                        return this.close();
                }
            })

            this.modal.appendChild(this.closeButton)
        }


        const position = {
            topTarget: {
                s: '10%', // start position
                t: '10%', // top position
                l: '3%', // left position
                r: '3%', // right position

            },
            centerTarget: {
                c: 'auto' // center position
            },
            bottomTarget: {
                bc: '10%', // bottom center position
                bl: '3%', // bottom left position
                br: '3%', // bottom right position

            },
            closeModal(animateParams) {
                return animateParams;
            }
        }

        const { // Деструктуризируем
            topTarget: { // вложенная деструктуризация
                s,
                l,
                t,
                r,
                },
            centerTarget: {
                c
            },
            bottomTarget: {
                bc,
                bl,
                br,
            }

        } = position // сам объект


        switch (modalPosition) {
            case T:
                this.modal.style.top = t
                break;
            case TL:
                this.modal.style.top = s;
                this.modal.style.left = l;
                break;
            case TR:
                this.modal.style.top = s;
                this.modal.style.right = r;
                break;
            case C:
                this.modal.style.top = c
                break;
            case B:
                this.modal.style.bottom = bc;
                break;
            case BL:
                this.modal.style.bottom = bc;
                this.modal.style.left = bl
                break;
            case BR:
                this.modal.style.bottom = bc;
                this.modal.style.right = br;
                return
            default:
                this.modal.style.top = t
        }
    }

    T = 'top';
    TL = 'topLeft';
    TR = 'topRight';
    C = 'center';
    B = 'bottom';
    BR = 'bottomRight';
    BL = 'bottomLeft';


    createElement(tagName, className) {
        let elem = document.createElement(tagName)
        if (className) elem.className = className
        return elem;
    }

    animationPos() {
        if (!this.settings.modalPosition) this.modal.style.animation = this.slideInDown;
        if (
             !(
                this.settings.modalPosition !== this.T
                    &&
                this.settings.modalPosition !== this.TL
                    &&
                this.settings.modalPosition !== this.TR
                    &&
                this.settings.modalPosition !== this.C
              )
        ) {
            this.modal.style.animation = this.slideInDown;
        } else if (
            !(
                this.settings.modalPosition !== this.B
                    &&
                this.settings.modalPosition !== this.BL
                    &&
                this.settings.modalPosition !== this.BR
            )
        ) {
            this.modal.style.animation = this.slideInTop;
        }

    }

    open() {
        this.animationPos()
        this.app.appendChild(this.overlay)
    }

    close() {

        setTimeout(() => {

            this.overlay.remove()
        }, 200)
    }
}
