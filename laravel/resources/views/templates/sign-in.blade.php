<div id="sign-in-modal" class="modal" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="container-fluid">
                        <div class="row text-center">
                            <div class="col-12 mb-3 mt-0">
                                <i class="bi bi-shield-lock" style="font-size: 6rem"></i>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-in-email" name="email" type="email" class="form-control"
                                           placeholder="Адреса електронної пошти" autocomplete="off">
                                    <label for="sign-in-email">Адреса електронної пошти</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-in-password" name="password" type="password" class="form-control"
                                           placeholder="Пароль">
                                    <label for="sign-in-password">Пароль</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="mb-3 text-muted text-center">
                                    <a id="i-am-not-registered" href="#">
                                        Я не зареєстрований!
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <button type="button" class="btn btn-lg btn-success w-100 mb-3">
                                    <i data-button-icon="default"></i>
                                    <span data-button-text="default" class="align-middle">Увійти</span>

                                    <i data-button-icon="loading"
                                       class="spinner-border spinner-border-sm me-1 align-middle d-none"></i>
                                    <span data-button-text="loading" class="align-middle d-none">Перевірка...</span>

                                    <i data-button-icon="success"
                                       class="bi bi-check-circle me-1 align-middle d-none"></i>
                                    <span data-button-text="success" class="align-middle d-none">Перевірено</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
