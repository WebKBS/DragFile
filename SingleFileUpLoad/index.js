const fileInput = document.querySelectorAll('input[type=file]');
const label = document.querySelectorAll('label');
const deleteFileBtn = document.querySelectorAll('.file_delete');

// 파일 업로드 후 취소 버튼 클릭시 초기화
deleteFileBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input[type=file]');
    const imgWrap = btn.parentElement.querySelector('.label_img_wrap');
    const textWrap = btn.parentElement.querySelector('.text_wrap');

    input.value = '';

    while (imgWrap.firstChild) {
      imgWrap.removeChild(imgWrap.firstChild);
    }

    textWrap.style.display = 'flex';
    btn.style.display = 'none';
    imgWrap.style.position = 'absolute';
  });
});

fileInput.forEach((ev) => {
  ev.addEventListener('change', (event) => {
    const files = changeEvent(event);
    handleUpdate(files, event.target);
  });
});

label.forEach((event) => {
  event.addEventListener('mouseover', (ev) => {
    ev.preventDefault();
    ev.currentTarget.parentElement.classList.add('on');
  });

  event.addEventListener('mouseout', (ev) => {
    ev.preventDefault();
    ev.currentTarget.parentElement.classList.remove('on');
  });
});

document.addEventListener('dragenter', (event) => {
  event.preventDefault();
});

document.addEventListener('dragover', (event) => {
  event.preventDefault();

  if (event.target.className === 'label_img_wrap') {
    event.target.closest('li').classList.add('on');
  }
});

document.addEventListener('dragleave', (event) => {
  event.preventDefault();
  if (event.target.className === 'label_img_wrap') {
    event.target.closest('li').classList.remove('on');
  }
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  console.log('drop');
  if (event.target.className === 'label_img_wrap') {
    handleUpdate([...files], event.target);
  }
});

function changeEvent(event) {
  const { target } = event;
  return [...target.files];
}

function handleUpdate(fileList, target) {
  fileList.forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const preview = createElement(event, file);
      const ele = target.closest('li').querySelector('.label_img_wrap');
      const textWrap = target.closest('li').querySelector('.text_wrap');
      const button = target.closest('li').querySelector('.file_delete');
      console.log(file);

      if (file.type === 'image/png') {
        button.style.display = 'block';
        textWrap.style.display = 'none';
        ele.style.position = 'static';
        ele.appendChild(preview);
        return;
      } else if (file.type === 'application/pdf') {
        const createEle = document.createElement('i');
        createEle.textContent = file.name;
        button.style.display = 'block';
        textWrap.style.display = 'none';
        ele.style.position = 'static';
        ele.appendChild(createEle);
        return;
      } else {
        alert('지정된 파일형식이 아닙니다.');
      }
    });
    reader.readAsDataURL(file);
  });
}

const createElement = (e, file) => {
  const fragment = document.createDocumentFragment();
  const img = document.createElement('img');
  img.setAttribute('src', e.target.result);
  img.setAttribute('data-file', file.name);
  fragment.appendChild(img);
  return fragment;
};
