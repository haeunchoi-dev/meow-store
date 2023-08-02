import multer from 'multer';
import path from 'path';

const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split('/');

  const fileType = typeArray[1]; // 이미지 확장자 추출

  //이미지 확장자 구분 검사
  if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false,
    );
  }
};

const generateFilename = (file) => {
  const timestamp = Date.now();
  const ext = path.extname(file.originalname); // 파일의 확장자
  // return `${timestamp}${extension}`;
  return path.basename(file.originalname, ext) + Date.now() + ext;
};

const serverRoot = path.resolve(process.cwd());
const storage = multer.diskStorage({
  destination: serverRoot + '/views/uploads/', // 이미지 업로드 경로
  filename: (req, file, cb) => {
    const filename = generateFilename(file);
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
  //dest: __dirname + '/uploads/', // 이미지 업로드 경로
  //limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

export { upload };
