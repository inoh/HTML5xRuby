Pusher::Application.routes.draw do
  resources :websocket, :only => [:index, :create]
  resources :webrtc, :only => [:index]
  resources :cameras, :only => [:index]

  root :to => 'welcome#index'
end
