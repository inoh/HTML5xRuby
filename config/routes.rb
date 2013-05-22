Pusher::Application.routes.draw do
  resources :websocket, :only => [:index, :create]
end
