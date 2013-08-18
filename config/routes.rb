Pusher::Application.routes.draw do
  resources :websocket, :only => [:index, :create]
  resources :webrtc, :only => [:index]

  root :to => 'welcome#index'
end
