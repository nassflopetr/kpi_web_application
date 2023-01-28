<div id="change-password-modal" class="modal" aria-hidden="true" tabindex="-1">
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
                                <i class="bi bi-person-gear" style="font-size: 6rem"></i>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="change-password-password" name="password" type="password"
                                           class="form-control"
                                           placeholder="Пароль">
                                    <label for="change-password-password">Пароль</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="change-password-new-password" name="new_password" type="password"
                                           class="form-control"
                                           placeholder="Новий пароль">
                                    <label for="change-password-new-password">Новий пароль</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="change-password-confirmation-new-password" name="confirmation_new_password" type="password"
                                           class="form-control"
                                           placeholder="Підтвердження нового пароля">
                                    <label for="change-password-confirmation-new-password">Підтвердження нового пароля</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="mb-3 text-muted text-center">
                                    <a id="i-want-to-change-my-profile-settings" href="#">
                                        Налаштування профілю!
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <button type="button" class="btn btn-lg btn-success w-100 mb-3">
                                    <i data-button-icon="default"></i>
                                    <span data-button-text="default" class="align-middle">Змінити</span>

                                    <i data-button-icon="loading"
                                       class="spinner-border spinner-border-sm me-1 align-middle d-none"></i>
                                    <span data-button-text="loading" class="align-middle d-none">Очікуйте...</span>

                                    <i data-button-icon="success"
                                       class="bi bi-check-circle me-1 align-middle d-none"></i>
                                    <span data-button-text="success" class="align-middle d-none">Змінено</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
