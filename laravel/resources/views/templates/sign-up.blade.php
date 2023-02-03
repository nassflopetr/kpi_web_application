<div id="sign-up-modal" class="modal" aria-hidden="true" tabindex="-1">
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
                                <i class="bi bi-person-add" style="font-size: 6rem"></i>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-first-name" name="first_name" type="text" class="form-control"
                                           placeholder="Ім'я" autocomplete="off">
                                    <label for="sign-up-first-name">Ім'я</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-last-name" name="last_name" type="text" class="form-control"
                                           placeholder="Прізвище" autocomplete="off">
                                    <label for="sign-up-last-name">Прізвище</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-phone" name="phone" type="text" class="form-control"
                                           placeholder="Номер телефону" autocomplete="off">
                                    <label for="sign-up-phone">Номер телефону</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-email" name="email" type="email" class="form-control"
                                           placeholder="Адреса електронної пошти" autocomplete="off">
                                    <label for="sign-up-email">Адреса електронної пошти</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-address" name="address" type="text" class="form-control"
                                           placeholder="Фізична адреса" autocomplete="off">
                                    <label for="sign-up-address">Фізична адреса</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-password" name="password" type="password" class="form-control"
                                           placeholder="Пароль">
                                    <label for="sign-up-password">Пароль</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="sign-up-confirmation-password" name="confirmation_password"
                                           type="password"
                                           class="form-control" placeholder="Підтвердження пароля">
                                    <label for="sign-up-confirmation-password">Підтвердження пароля</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="text-muted mb-3 text-center">
                                    <a id="i-am-registered" href="#">
                                        Я зареєстрований!
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <button type="button" class="btn btn-lg btn-success w-100 mb-3">
                                    <i data-button-icon="default"></i>
                                    <span data-button-text="default" class="align-middle">Зареєструватися</span>

                                    <i data-button-icon="loading"
                                       class="spinner-border spinner-border-sm me-1 align-middle d-none"></i>
                                    <span data-button-text="loading" class="align-middle d-none">Очікуйте...</span>

                                    <i data-button-icon="success"
                                       class="bi bi-check-circle me-1 align-middle d-none"></i>
                                    <span data-button-text="success" class="align-middle d-none">Зареєстровано</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
