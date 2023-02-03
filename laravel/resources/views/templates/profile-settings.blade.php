<div id="profile-settings-modal" class="modal" aria-hidden="true" tabindex="-1">
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
                                    <input id="profile-settings-first-name" name="first_name" type="text" class="form-control"
                                           placeholder="Ім'я" autocomplete="off">
                                    <label for="profile-settings-first-name">Ім'я</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="profile-settings-last-name" name="last_name" type="text" class="form-control"
                                           placeholder="Прізвище" autocomplete="off">
                                    <label for="profile-settings-last-name">Прізвище</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="profile-settings-phone" name="phone" type="text" class="form-control"
                                           placeholder="Номер телефону" autocomplete="off">
                                    <label for="profile-settings-phone">Номер телефону</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="profile-settings-email" name="email" type="email" class="form-control"
                                           placeholder="Адреса електронної пошти" autocomplete="off">
                                    <label for="profile-settings-email">Адреса електронної пошти</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input id="profile-settings-address" name="address" type="text" class="form-control"
                                           placeholder="Фізична адреса" autocomplete="off">
                                    <label for="profile-settings-address">Фізична адреса</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="text-muted mb-3 text-center">
                                    <a id="i-want-to-change-my-password" href="#">
                                        Змінити пароль!
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="text-muted mb-3 text-center">
                                    <a id="i-want-to-delete-my-profile" href="#">
                                        Видалити обліковий запис!
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
