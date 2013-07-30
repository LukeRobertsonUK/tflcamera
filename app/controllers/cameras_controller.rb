class CamerasController < ApplicationController
  def index
    @cameras = Camera.where(available: true)

    respond_to do |format|
      format.json { render :json => @cameras }
      format.html
    end
  end
end
