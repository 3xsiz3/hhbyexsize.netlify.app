const ticker = document.getElementById('ticker');
  const text = ticker.innerHTML;

  while (ticker.scrollWidth < window.innerWidth * 2) {
    ticker.innerHTML += text;
  }

  let offset = 0;

  function animate() {
    offset -= 1;
    ticker.style.transform = `translateX(${offset}px)`;
    if (Math.abs(offset) >= ticker.scrollWidth / 2) {
      offset = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.js-we-can-item');
    const hoverAreas = document.querySelectorAll('.js-hr-hover');
    
    activateItem(items[0]);
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            activateItem(this);
        });
    });
    
    hoverAreas.forEach(area => {
        area.addEventListener('click', function() {
            const item = this.parentElement.previousElementSibling;
            if (item && item.classList.contains('js-we-can-item')) {
                activateItem(item);
            }
        });
    });
    
    function activateItem(activeItem) {
        items.forEach(item => {
            item.classList.remove('active');
        });

        activeItem.classList.add('active');
    }
});

document.querySelectorAll('.list_case').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.list_case').forEach(btn => {
        btn.classList.remove('list_case_active');
      });
      
      this.classList.add('list_case_active');
    });
  });

  document.querySelectorAll('.buttom_view_more').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.add('hidden');
  });
  });

  document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.list_case');
  const horizontalCases = document.querySelectorAll('.horisontal_cases');
  const showMoreBtn = document.querySelector('.buttom_view_more');
  const lastCaseIndex = horizontalCases.length - 1;
  
  // Флаг для отслеживания состояния кнопки
  let isAllCasesShown = false;
  
  // Скрываем последний блок по умолчанию
  horizontalCases[lastCaseIndex].style.display = 'none';
  
  // Обработчик для кнопки "Показать еще"
  showMoreBtn.addEventListener('click', function() {
    horizontalCases[lastCaseIndex].style.display = 'flex';
    this.classList.add('hidden');
    isAllCasesShown = true; // Запоминаем, что все карточки показаны
  });
  
  // Обработчики для кнопок фильтрации
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Сброс активных кнопок
      document.querySelectorAll('.list_case').forEach(btn => {
        btn.classList.remove('list_case_active');
      });
      this.classList.add('list_case_active');
      
      const filter = this.textContent.trim();
      
      // Сначала скрываем все блоки
      horizontalCases.forEach(container => {
        container.style.display = 'none';
      });
      
      // Показываем нужные блоки
      if (filter === 'Все работы') {
        // Показываем все блоки, если кнопка была нажата
        if (isAllCasesShown) {
          horizontalCases.forEach(container => {
            container.style.display = 'flex';
          });
          showMoreBtn.classList.add('hidden');
        } else {
          // Иначе показываем все кроме последнего
          for (let i = 0; i < lastCaseIndex; i++) {
            horizontalCases[i].style.display = 'flex';
          }
          showMoreBtn.classList.remove('hidden');
        }
      }
      else if (filter === 'Внедрение') {
        horizontalCases[0].style.display = 'flex';
        showMoreBtn.classList.add('hidden');
      }
      else if (filter === 'Сопровождение') {
        horizontalCases[1].style.display = 'flex';
        showMoreBtn.classList.add('hidden');
      }
      // Для "Обучение" ничего не показываем
    });
  });
  
  // Активируем кнопку "Все работы" по умолчанию
  document.querySelector('.list_case_active').click();
  });

  document.addEventListener('DOMContentLoaded', function() {
  const statsBlocks = document.querySelectorAll('.stats_block');
  let animated = false; // Флаг, чтобы отслеживать было ли уже воспроизведено

  function animateNumbers() {
    if (animated) return; // Если уже анимировали, выходим
    
    statsBlocks.forEach(block => {
      const numberElement = block.querySelector('.first_stats_info');
      const percentElement = block.querySelector('.procent');
      
      if (numberElement) {
        const targetNumber = parseInt(numberElement.textContent);
        const duration = 3000; // Длительность анимации в мс
        const startTime = Date.now();
        
        numberElement.textContent = '0';
        
        function updateNumber() {
          const currentTime = Date.now();
          const progress = Math.min(1, (currentTime - startTime) / duration);
          const currentNumber = Math.floor(progress * targetNumber);
          
          numberElement.textContent = currentNumber.toString();
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else if (percentElement) {
            // Если есть процент, добавляем его после завершения анимации числа
            percentElement.style.opacity = '1';
          }
        }
        
        requestAnimationFrame(updateNumber);
      }
    });
    
    animated = true; // Помечаем как анимированное
  }

  function checkVisibility() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
    
    if (isVisible) {
      animateNumbers();
      // Удаляем обработчик после первого срабатывания
      window.removeEventListener('scroll', checkVisibility);
    }
  }

  // Проверяем при загрузке страницы (может быть уже в viewport)
  checkVisibility();
  
  // Добавляем обработчик скролла
  window.addEventListener('scroll', checkVisibility);
  });

   // Открытие модального окна
  document.querySelectorAll('.buttom_cards').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('modalOverlay').style.display = 'flex';
      document.body.classList.add('modal-open');
    });
  });

  // Закрытие модального окна
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  // Закрытие при клике вне модального окна
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').style.display = 'none';
    }
  });

  const modalOverlay = document.getElementById('modalOverlay');
const modalForm = modalOverlay.querySelector('.modal-form-window');
const modalThankYou = modalOverlay.querySelector('.modal-thank-you');

// Открыть форму
document.querySelectorAll('.buttom_cards').forEach(button => {
  button.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    document.body.classList.add('modal-open');
    modalForm.classList.add('show');
  });
});

// Закрытие по крестику или клику вне окна
modalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
    closeAllModals();
  }
});

function closeAllModals() {
  modalForm.classList.remove('show');
  modalThankYou.classList.remove('show');
  document.body.classList.remove('modal-open');
  setTimeout(() => {
    modalOverlay.style.display = 'none';
  }, 400);
}

// При отправке формы показываем "спасибо"
document.getElementById('projectForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Закрыть форму
  modalForm.classList.remove('show');

  // Показать "Спасибо"
  setTimeout(() => {
    modalThankYou.classList.add('show');
  }, 400);
});

fetch('/html/navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('navbaaar').innerHTML = html;

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const modalOverlay = document.getElementById('modalOverlay');
        const modalForm = modalOverlay.querySelector('.modal-form-window');
        const modalThankYou = modalOverlay.querySelector('.modal-thank-you');

        modalForm.classList.remove('show');
        modalOverlay.style.display = 'flex';
        modalThankYou.classList.add('show');
        document.body.classList.add('modal-open');

        // Сброс значений формы
        const form = modalOverlay.querySelector('form');
        if (form) {
          form.reset();
        }
      });
    }

    // === ДОБАВЬТЕ ЭТО СЮДА ===
    const submitBtnMobile = document.getElementById('submit-btn-mobile');
    if (submitBtnMobile) {
      submitBtnMobile.addEventListener('click', (e) => {
        e.preventDefault();

        const modalOverlay = document.getElementById('modalOverlay');
        const modalForm = modalOverlay.querySelector('.modal-form-window');
        const modalThankYou = modalOverlay.querySelector('.modal-thank-you');

        modalForm.classList.remove('show');
        modalOverlay.style.display = 'flex';
        modalThankYou.classList.add('show');
        document.body.classList.add('modal-open');

        // Сброс значений формы
        const form = modalOverlay.querySelector('form');
        if (form) {
          form.reset();
        }
      });
    }
    // === КОНЕЦ ДОБАВЛЕНИЯ ===
  });


  // добавление контактов в конец страницы
  fetch('/html/contacts.html')
      .then(response => response.text())
  .then(html => document.getElementById('contaacts').innerHTML = html);
      
//+ krestik
// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }
});
// ...existing code...



// +mobile cases menu
document.addEventListener('DOMContentLoaded', function() {
  // Мобильный выпадающий фильтр кейсов
  const dropdownBtn = document.getElementById('mobile-cases-dropdown-btn');
  const dropdownList = document.getElementById('mobile-cases-dropdown-list');
  const options = document.querySelectorAll('.list_case_mobile_option');
  const cases = document.querySelectorAll('.case_mobile');

  if (dropdownBtn && dropdownList) {
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownList.classList.toggle('active');
    });

    options.forEach(option => {
      option.addEventListener('click', function() {
        const filter = this.dataset.filter;
        dropdownBtn.textContent = filter;
        dropdownList.classList.remove('active');

        cases.forEach(card => {
          if (filter === 'Все работы' || card.dataset.type === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Закрытие по клику вне
    document.addEventListener('click', function(e) {
      if (!dropdownList.contains(e.target) && e.target !== dropdownBtn) {
        dropdownList.classList.remove('active');
      }
    });
  }
});


// + block масштаба
document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchmove', function(event) {
  if (event.scale !== undefined && event.scale !== 1) {
    event.preventDefault();
  }
}, { passive: false });


// Открытие модального окна по кнопке "Обсудить проект"
document.querySelectorAll('.firstbutton').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modalOverlay').style.display = 'flex';
    document.body.classList.add('modal-open');
    const modalForm = document.querySelector('.modal-form-window');
    if (modalForm) modalForm.classList.add('show');
  });
});