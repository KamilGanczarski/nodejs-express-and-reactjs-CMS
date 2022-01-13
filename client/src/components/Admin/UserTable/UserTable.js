import React from 'react'

export default function UserTable() {
  return (
    <section className="w-100 row m-0 justify-content-center">
      <article className="col-sm-12 col-xl-11 row p-4 mx-auto">
        <div className="w-100 row px-2 mx-0 mb-4 border-bottom">
          {/* Main title */}
          <h5 className="col-12 col-lg-5 px-0 py-2 m-0">Management</h5>
    
          {/* Left buttons */}
          <div className="col-12 col-lg-7 px-0 pb-1 m-0 d-flex justify-content-end align-items-end">
            {/* Add user - toggle modal */}
            <button className="btn btn-sm fw-bold text-hover-theme btn-slide-icon"
              data-bs-toggle="modal" data-bs-target="#add-client">
              <span className="text-theme">Add</span>
              <i className="icon-plus theme"></i>
            </button>
            
            {/* <a v-if="preview_href != ''" v-bind:href="preview_href"
              class="btn btn-sm fw-bold text-hover-theme">
              <?=Lang::t('Preview')?>
            </a> */}
          </div>
        </div>
      </article>
    </section>
  )
}
