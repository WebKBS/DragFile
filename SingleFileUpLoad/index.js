const fileInput = document.querySelector('input[type=file]');
const label = document.querySelector('.upload_label');
const deleteFileBtn = document.querySelector('.file_delete');

const fileType = ['image/png', 'application/pdf'];

// 파일 업로드 후 취소 버튼 클릭시 초기화
deleteFileBtn.addEventListener('click', () => {
  const input = deleteFileBtn.parentElement.querySelector('input[type=file]');
  const imgWrap = deleteFileBtn.parentElement.querySelector('.label_img_wrap');
  const textWrap = deleteFileBtn.parentElement.querySelector('.text_wrap');

  input.value = '';

  while (imgWrap.firstChild) {
    imgWrap.removeChild(imgWrap.firstChild);
  }

  textWrap.style.display = 'flex';
  deleteFileBtn.style.display = 'none';
  imgWrap.style.position = 'absolute';
});

fileInput.addEventListener('change', (event) => {
  const files = changeEvent(event);
  handleUpdate(files, event.target);
});

label.addEventListener('mouseover', (ev) => {
  ev.preventDefault();
  ev.currentTarget.parentElement.classList.add('on');
});

label.addEventListener('mouseout', (ev) => {
  ev.preventDefault();
  ev.currentTarget.parentElement.classList.remove('on');
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
      const ele = target.closest('.view_wrap').querySelector('.label_img_wrap');
      const textWrap = target.closest('.view_wrap').querySelector('.text_wrap');
      const button = target.closest('.view_wrap').querySelector('.file_delete');
      console.log(file);

      if (file.type === fileType[0]) {
        button.style.display = 'block';
        textWrap.style.display = 'none';
        ele.style.position = 'static';
        ele.appendChild(preview);
        return;
      } else if (file.type === fileType[1]) {
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
