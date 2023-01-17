window.addEventListener('DOMContentLoaded', dragFileUpload);

function dragFileUpload() {
  const dragFileView = document.getElementById('dragFileView');
  const elements = `
      <div class="drag_upload">
        <div class="inner">
          <input id="upload" type="file" hidden accept=".png, .jpg, .jpeg" />
          <label for="upload" class="drop">
            <span class="text_wrap">
              <span class="title">사업자 등록증</span>
              <span>Drag & Drop</span>
              <span>png, jpg, jpeg</span>
            </span>
            <span class="label_img_wrap"></span>
          </label>
          <button type="button" class="file_delete">
            <span class="line"></span>
            <span class="line"></span>
          </button>
        </div>
      </div>
`;
  dragFileView.insertAdjacentHTML('beforeend', elements);

  a();
  expandImage();
}

function a() {
  const fileInput = document.querySelectorAll('input[type=file]');
  const label = document.querySelectorAll('.modal_upload label');
  const deleteFileBtn = document.querySelectorAll('.file_delete');

  deleteFileBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input[type=file]');
      const imgWrap = btn.parentElement.querySelector('.label_img_wrap');
      const textWrap = btn.parentElement.querySelector('.text_wrap');

      input.value = '';
      disabledFalse(input); // 파일 취소시 disabled 해제

      while (imgWrap.firstChild) {
        imgWrap.removeChild(imgWrap.firstChild);
      }

      textWrap.style.display = 'flex';
      btn.style.display = 'none';
      imgWrap.style.position = 'absolute';
      imgWrap.removeAttribute('data-toggle');
      imgWrap.removeAttribute('data-target');
    });
  });

  fileInput.forEach((ev) => {
    ev.addEventListener('change', async (event) => {
      const files = changeEvent(event);
      handleUpdate(files, event.target);
      disabledTrue(ev); // 파일 추가시 input disabled
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
      event.target.closest('.inner').classList.add('on');
    }
  });

  document.addEventListener('dragleave', (event) => {
    event.preventDefault();
    if (event.target.className === 'label_img_wrap') {
      event.target.closest('.inner').classList.remove('on');
    }
  });

  document.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log('drop');
    if (event.target.className === 'label_img_wrap') {
      handleUpdate([...files], event.target);
      event.target.parentElement.previousElementSibling.disabled = true;
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
        const ele = target.closest('.inner').querySelector('.label_img_wrap');
        const textWrap = target.closest('.inner').querySelector('.text_wrap');
        const button = target.closest('.inner').querySelector('.file_delete');

        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
          button.style.display = 'block';
          textWrap.style.display = 'none';
          ele.style.position = 'static';
          ele.appendChild(preview);
          for (let i = 1; i < ele.children.length; i++) {
            ele.children[i].remove();
          }
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
  // disabled True
  function disabledTrue(target) {
    target.disabled = true;
  }

  function disabledFalse(target) {
    target.disabled = false;
  }

  // addFunc(boolean, "block", src)
  function addFunc(isDisable, style = 'none', img) {
    const input = document.getElementById('upload');
    const button = document.querySelector('.file_delete');
    const image = document.querySelector('.label_img_wrap');
    const imgElement = document.createElement('img');
    const textWrap = document.querySelector('.text_wrap');

    image.setAttribute('data-toggle', 'modal');
    image.setAttribute('data-target', '.bd-example-modal-lg');
    input.disabled = isDisable;
    button.style.display = style;
    textWrap.style.display = 'none';
    image.append(imgElement);
    image.querySelector('img').src = img;
  }
}

function expandImage() {
  const labelImage = document.querySelector('.label_img_wrap');
  labelImage.addEventListener('click', () => {
    if (labelImage.children.length < 1) {
      return;
    }
    const eleChildImage = labelImage.children[0].src;
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = eleChildImage;
    div.append(img);
    div.classList.add('view_modal');
    div.style.position = 'fixed';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.backgroundColor = 'rgba(0, 0, 0, .7)';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.zIndex = '2000';
    img.style.maxWidth = '80%';
    img.style.maxHeight = '80%';
    img.style.position = 'absolute';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%)';

    document.body.append(div);

    document.querySelector('.view_modal').addEventListener('click', (ev) => {
      if (ev.target === document.querySelector('.view_modal')) {
        document.querySelector('.view_modal').remove();
      }
    });
  });
}
