// https://api.themoviedb.org/3/movie/%7BIDMOVIE%7D/credits?api_key=2710a075a597ce49902180854b8f881a&language=en-US

export type Credit = {
	adult: boolean;
	gender: Number;
	id: Number;
	known_for_department: String;
	name: String;
	original_name: String;
	popularity: 26.259;
	profile_path: String;
	cast_id: Number;
	character: String;
	credit_id: String;
	order: Number;
};

export type CreditStore = { isLoaded: boolean; data: Credit[] };

export type ResponseJSON = {
	id: number;
	cast: Credit[];
	crew?: any[];
};
