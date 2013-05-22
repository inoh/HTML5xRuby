class SamplesController < ApplicationController
  def create
    Pusher['sample-channel'].trigger('sample-event', {:message => params[:text]})
    render :text => 'success'
  end
end
