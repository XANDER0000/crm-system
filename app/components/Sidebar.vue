<template>
  <aside class="sidebar">
    <div class="sidebar__box">
      <div class="sidebar__header">
          <NuxtLink class="sidebar__logo" to="">
            <NuxtImg src="assets/img/logo.svg" width="40" height="40" alt="Логотип" />
          </NuxtLink>
          <div class="logo logo--blue logo--mini sidebar__logo">
              <div class="logo__image">
              </div>
          </div>
          <UiNavBtn />
      </div>
      <div class="sidebar__content">
        <div class="sidebar__btns"> 
          <NuxtLink class="sidebar__btn" to="">Уведомления</NuxtLink>
        </div>
    </div>
</div>

  </aside>
</template>

<script setup lang="ts">
import debounce from '@/utils/debounce';
import ScrollLock from '@/helpers/scroll-lock';


onMounted(() => {
  if (!window.scrollLock) {
    window.scrollLock = new ScrollLock();
  }
  
  const foundElements = document.querySelectorAll<HTMLElement>('.sidebar__content');
  if (foundElements.length !== 0) {
    sidebarInit(foundElements);
  }
});

function sidebarInit(elements: NodeListOf<HTMLElement>) {
  elements.forEach((component: HTMLElement) => {
    const baseClass = 'aside';

    const toggles = document.querySelectorAll('[data-toggle="aside"]');
    const page = document.querySelector('.page');

    // Инициализация переключаемого режима
    const init = () => {
      if (!matchMedia('(min-width: 64em)').matches) {
        component.style.visibility = 'hidden';
        component.setAttribute('aria-hidden', 'true');
      }
    };

    init();

    // Сброс переключаемого режима
    const reset = () => {
      component.removeAttribute('aria-hidden');
      component.removeAttribute('aria-modal');
      component.removeAttribute('role');
      component.style.visibility = '';
      window.scrollLock.enableScrolling();
    };

    const open = () => {
      component.classList.add('is-open');

      component.setAttribute('aria-hidden', 'false');
      component.setAttribute('aria-modal', 'true');
      component.setAttribute('role', 'dialog');
      component.style.visibility = 'visible';

      toggles.forEach((toggle) => {
        toggle.classList.add('active');
      });

      if (page) page.classList.add('page--aside-open');
      window.scrollLock.disableScrolling();

      component.dispatchEvent(new CustomEvent('open'));
    };

    const close = () => {
      component.classList.remove('is-open');

      component.setAttribute('aria-hidden', 'true');
      component.setAttribute('aria-modal', 'false');
      component.setAttribute('role', 'none');
      setTimeout(() => {
        component.style.visibility = 'hidden';
      }, 200);

      toggles.forEach((toggle) => {
        toggle.classList.remove('active');
      });

      if (page) page.classList.remove('page--aside-open');
      window.scrollLock.enableScrolling();
      component.dispatchEvent(new CustomEvent('close'));
    };

    const isOpen = () => component.classList.contains('is-open');

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        if (isOpen()) {
          close();
        } else {
          open();
        }
      }, true);
    });

    // Клик по кнопке "Закрыть" меню
    const btnClose = component.querySelector(`.${baseClass}__btn-close`);
    if (btnClose) {
      btnClose.addEventListener('click', (event) => {
        event.preventDefault();
        close();
      }, false);
    }

    // Закрываем навигационную панель по ESC
    document.addEventListener('keydown', (event) => {
      if ((event.code === 'Escape') && isOpen()) {
        close();
      }
    }, false);

    /*
      Принудительно сбрасываем навигационную панель
      при расширении браузера за пределы мобильных разрешений
    */
    const handleResizePage = () => {
      if (matchMedia('(min-width: 64em)').matches) {
        // if (isOpen()) close();
        setTimeout(reset, 200);
        // reset();
      }
    };

    window.addEventListener('resize', debounce(handleResizePage, 200));
  });
}
</script>

<style lang="stylus">
.sidebar
  display block
  @media(min-width 1280px)
    flex 0 0 auto
    width 280px

  &__header
    z-index 100

  &__content
    z-index 99
    transition transform .2s linear, opacity .3s ease
    &:focus
      outline none
    @media(max-width 1280px)
      transform translateY(-100%)
      opacity 0

    &.is-open
      transform none
      opacity 1

  &__box
    display flex
    flex-direction column
    align-items flex-start
    @media(min-width 1280px)
      position sticky
      top 0
      gap 2rem
      padding 0.75rem
      background-color var(--color-white)
      border-radius 0.5rem

  &__btns
    display flex
    flex-direction column

  &__btn
    display flex
    gap 8px
    align-items center
    padding 0.75rem
    text-decoration none
    &--selected
      &::after
        size 8px
        background-color #e6462a
        border-radius 50%
        content ''

  &__btn-count
    display flex
    flex 0 0 auto
    align-items center
    justify-content center
    min-width 25px
    min-height 25px
    padding 0 0.25rem
    color var(--color-white)
    font-size 0.875rem
    line-height 1
    text-align center
    background-color #e6462a
    border-radius 50%

  &__header
    position fixed
    top 0
    left 0
    display flex
    gap 12px
    align-items center
    justify-content space-between
    width 100%
    padding 0.625rem
    background-color var(--color-white)
    @media(min-width 1280px)
      position static
      padding 0 0.75rem
      background-color transparent

  &__content
    position fixed
    top 64px
    left 0
    display flex
    flex-direction column
    gap 12px
    width 100%
    height 100%
    padding 12px
    overflow-y auto
    background-color var(--color-white)
    @media(min-width 1280px)
      position static
      height auto
      padding 0
      overflow visible
      background-color transparent

  &__main
    display flex
    flex-direction column
    gap 20px
    padding 0.625rem
    @media(min-width 1280px)
      padding 0 0.75rem

</style>