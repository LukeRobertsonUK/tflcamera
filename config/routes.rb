Tflcameras::Application.routes.draw do
  # get "cameras/index"

  resources :cameras
root to: 'cameras#index'

end
