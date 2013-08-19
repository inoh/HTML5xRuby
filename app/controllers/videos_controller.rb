class VideosController < ApplicationController
  def show
    p params
    render :text => 'video'
  end
end
