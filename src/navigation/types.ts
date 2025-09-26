export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  FaceUpload: undefined;
  CapturePreview: { imageUri?: string } | undefined;
  Uploading: { imageUri?: string } | undefined;
  CaptureSuccess: { imageUri?: string } | undefined;
};
