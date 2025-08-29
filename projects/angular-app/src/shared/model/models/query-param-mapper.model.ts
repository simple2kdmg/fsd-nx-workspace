import { ParamMap } from '@angular/router';

/**
 * Мэппер содержит только логику парсинга параметров URL в тип `T`.
 * Он не должен учитывать дополнительную логику, когда, к примеру,
 * при наличии параметра Param-A в query другой параметр Param-B
 * игнорируется.
 * */
export type QueryParamMapper<T> = (paramMap: ParamMap) => T;
