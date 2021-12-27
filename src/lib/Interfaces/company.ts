// https://api.themoviedb.org/3/movie/%7BIDMOVIE%7D/credits?api_key=2710a075a597ce49902180854b8f881a&language=en-US

export type Company = {
    id: Number,
    logo_path?: string,
    name: String,
    origin_country: String
};

export type CompanyStore = { isLoaded: boolean; data: Company[] };

export type ResponseJSON = {
	production_companies: Company[];
};
