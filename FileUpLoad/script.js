const fileSelector = document.getElementById('upload');
const uploadLabel = document.querySelector('.upload_label');
const fileName = document.getElementById('file_name');
const fileMsg = document.getElementById('file_msg');

fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  fileName.textContent = fileList[0].name;
  fileMsg.textContent = '파일 업로드 완료';
  uploadLabel.classList.add('on');
});

uploadLabel.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.style.border = '2px dashed #2ECDFF';
  event.dataTransfer.dropEffect = 'copy';
});

uploadLabel.addEventListener('dragleave', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.style.border = '2px dashed transparent';
});

uploadLabel.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.style.border = '2px solid #2ECDFF';
  const fileList = event.dataTransfer.files;
  fileName.textContent = fileList[0].name;
  fileMsg.textContent = '파일 업로드 완료';
  uploadLabel.classList.add('on');
});
