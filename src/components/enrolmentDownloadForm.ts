export function enrolmentDownloadForm() {
  window.addEventListener('alpine:init', () => {
    window.Alpine.data('enrolmentDownload', function () {
      return {
        juniorSchool: false,
        seniorSchool: false,
        coCurricular: false,
        boarding: false,

        guideCheckboxList: null,

        enrolmentCheckbox: {
          ['@change']() {
            let anyCheckboxChecked = false;
            this.guideCheckboxList.forEach((guideCheckboxEl) => {
              if (guideCheckboxEl.checked) {
                anyCheckboxChecked = true;
              }
            });

            if (!anyCheckboxChecked) {
              this.guideCheckboxList[0].setAttribute('required', 'required');
            } else {
              this.guideCheckboxList[0].removeAttribute('required');
            }
          },
        },

        init() {
          this.guideCheckboxList = this.$root.querySelectorAll('input[type="checkbox"]');
        },
      };
    });
  });
}
