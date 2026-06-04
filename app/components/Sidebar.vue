<template>
  <aside class="sidebar" v-if="!isPageLoading">
    <div class="sidebar__box">
      <div class="sidebar__header">
          <NuxtLink class="sidebar__logo" to="">
            <NuxtImg src="assets/img/logo.svg" width="40" height="40" alt="Логотип" />
          </NuxtLink>
          <NavBtn />
      </div>
      <div class="sidebar__content">
        <div class="sidebar__btns"> 
          <div class="sidebar__user">
            <Icon name="mdi:account" class="sidebar__user-icon" />
            <span class="sidebar__user-name">{{ user.name || user.email }}</span>
            <button @click="handleLogout" class="sidebar__user-exit">
              <Icon name="mdi:exit-to-app" />
            </button>
          </div>
          <NuxtLink v-for="item in MENU_ITEMS" :key="item.name" class="sidebar__btn" :to="item.url">
            <Icon v-if="item.icon" class="sidebar__btn-icon" :name="item.icon" />
            <span class="sidebar__btn-label">{{ item.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import debounce from '@/utils/debounce';
import ScrollLock from '@/helpers/scroll-lock';
const isPageLoading = inject('isPageLoading');
const { getCurrentUser, logout } = useAuth();

interface MenuItem {
  icon?: string;
  name?: string;
  url?: string;
}

interface User {
  email?: string;
  name?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: 'mdi:house', name: 'Главная', url: '/' },
  { icon: 'mdi:shopping', name: 'Продукты', url: '/products' },
  { icon: 'mdi:order-bool-descending-variant', name: 'Заказы', url: '/orders' },
  { icon: 'mdi:users', name: 'Клиенты', url: '/customers' },
  { icon: 'mdi:feedback', name: 'Обратная связь', url: '/feedback' },
  { icon: 'mdi:settings', name: 'Настройки', url: '/settings' },
  { icon: 'mdi:help', name: 'Центр поддержки', url: '/help' },
]

const user = ref(<User>{});

const handleLogout = async () => {
  const result = await logout();

  if (result.success) {
    navigateTo('/login');
  } else if (result.error) {
    console.log(result.error);
  }
}

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

onMounted(async () => {
  const result = await getCurrentUser();
  if (result.success && result.data?.user) {
    user.value = {
      email: result.data.user.email,
      name: result.data.user.name
    };
  }
});

onMounted(() => {
  if (!window.scrollLock) {
    window.scrollLock = new ScrollLock();
  }

  const foundElements = document.querySelectorAll<HTMLElement>('.sidebar__content');
  if (foundElements.length !== 0) {
    sidebarInit(foundElements);
  }
});
</script>

<style lang="stylus">
.sidebar
  display block
  @media(min-width 1280px)
    flex 0 0 auto
    width 380px

  &__header
    z-index 100

  &__user
    display flex 
    gap 8px
    align-items center
    padding 0.75rem
    color var(--color-primary)
    &-name
      transition all .2s ease
    &-icon
      font-size 1.2rem
    &-exit
      display flex 
      align-items center
      justify-content center
      margin-left auto
      color var(--color-text)
      font-size 1.8rem
      &:hover
      &:focus-visible
        color var(--color-button-primary-dark)

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
    &:hover
    &:focus-visible
      text-decoration none
      color var(--color-button-primary-dark)
    &--selected
      &::after
        size 8px
        background-color #e6462a
        border-radius 50%
        content ''
  
  &__btn-icon
    width 20px
    height 20px

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