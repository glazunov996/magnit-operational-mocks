// JavaScript
const slicesOfIndicators = [
	{
		id: 20,
		name: "Инфляция",
		dimensions: {
			id: {
				"qLabel": "Инфляция_ID",
				"qLibraryId": "b5c2c683-13d9-4047-8220-e07f6b555afd",
			},
			period: {
				"qLabel": "График.Период",
				"qLibraryId": "WAGyz",
				"qNullSuppression": true,
				//СОРТИРОВКА
				"qDef" : {
					"qSortCriterias": [{
						"qSortByNumeric": 1,
					}],
				}
			}
		},
		block1: {
			arrow: {
				"qLabel": "Стрелка.Инфляция_день_округ_формат",
				"qLibraryId": "d5961d26-1e3e-42c6-8a91-6997d38d8ccf",
			},
			fact: {
				"qLabel": "ОсновнаяТаблица.Инфляция_день_тп_округ_формат",
				"qLibraryId": "01ab3b19-5680-432e-ad6d-8b10da47ba70",
			},
			factVsPpPercent: {
				"qLabel": "ОсновнаяТаблица.Инфляция_день_тпVSпп_округ_формат",
				"qLibraryId": "34289df4-fa8d-4c4d-be17-6a221d1e5615",
			}
		},
		block2: {
			arrow: {
				"qLabel": "Стрелка.Инфляция_округ_формат",
				"qLibraryId": "93270c2b-87a7-4582-acc1-92005a50ab17",
			},
			fact: {
				"qLabel": "ОсновнаяТаблица.Инфляция_тп_округ_формат",
				"qLibraryId": "98d6dff5-6e44-4ac9-9676-df91b161916e",
			},
			factVsPpPercent: {
				"qLabel": "ОсновнаяТаблица.Инфляция_тпVSпп_округ_формат",
				"qLibraryId": "4eee72ef-b09a-4836-96f3-0b49e2388a3b",
			}
			
		},
		chart: {
			fact: {
				"qLabel": "График.Инфляция_округ_формат",
				"qLibraryId": "8b0f87ac-81e6-4880-92b3-998970cfb0aa",
			},
			factPp: {
				"qLabel": "График.Инфляция_пп_округ_формат",
				"qLibraryId": "5d28b934-9b60-487d-b769-f5bbd08397ab",
			}, 
			factVsPp: {
				"qLabel": "График.Инфляция_тпVSпп_округ_формат",
				"qLibraryId": "5a34938f-edcf-42b9-b8b0-46fe6c774da3",
			}			
		}
	}
]

export default slicesOfIndicators;