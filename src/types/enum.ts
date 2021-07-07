export enum QuoteStep {
  QUOTE_SERVICE_DESK = '0',
  QUOTE_SEARCH_CAR = '1',
  QUOTE_CONTACT = '2',
  QUOTE_CONGRATS = '3',
}

export enum QuoteShowModal {
  NONE,
  SERVICE_INTRO,
  NOT_SURE_REASON,
  NOT_SURE_OTHER,
  REVIEW_QUOTE,
  SCHEDULE_SERVICE,
  FINISH_BOOKING,
  CONTACT,
  CONGRATS,

  DECIDE_ESTIMATE_RESPONSE,
}

export enum CarSelectType {
  BY_YEAR_MAKE_MODEL = 'car-select-by-year-make-model',
  BY_PLATE_NUMBER = 'car-select-by-plate-number',
}
