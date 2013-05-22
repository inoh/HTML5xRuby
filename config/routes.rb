Pusher::Application.routes.draw do
  resources :samples, :only => [:create]
end
