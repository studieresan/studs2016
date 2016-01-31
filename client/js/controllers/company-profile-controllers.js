(function() {

	var profileControllers = angular.module('companyProfileControllers', []);

	profileControllers.controller("chartsController", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		$scope.beforeDataIsSet = false;
		$scope.afterDataIsSet = false;

		$scope.$watch('company.eventDataBeforeURL', function () {
			//console.log($scope.company.eventDataBeforeURL);

			var re = /d\/(.+)\//; 
			var str = $scope.company.eventDataBeforeURL;
			var result = re.exec(str);
			var spreadsheetId = null;
			if(result !== null) {
				spreadsheetId = result[0].substring(2); // OBS! Has trailing "/"
			}

			if(spreadsheetId !== null) {
				$http.get("https://spreadsheets.google.com/feeds/list/" + spreadsheetId + "default/public/values?alt=json").then(function(response) {
				//console.log(response);
				temp = response.data.feed.entry;
				//console.log(temp);
				var data = {};
				data.masters = {data: [], labels: []};
				data.impression = {data: [], labels: []};
				data.knowledge = {data: [], labels: []};
				for (var i = 0; i < temp.length; i++) {
					// Masters thesis question
					var mastersIndex = temp[i].gsx$howlikelyisitthatyouwouldliketowriteyourmastersthesisworkatthiscompany.$t;
					var mastersDataIndex = data.masters.labels.indexOf(mastersIndex);
					if(mastersDataIndex < 0) {
						data.masters.labels.push(mastersIndex);
					}
					// New index made
					mastersDataIndex = data.masters.labels.indexOf(mastersIndex);
					if(data.masters.data[mastersDataIndex] === undefined) {
						data.masters.data[mastersDataIndex] = 1;
					} else {
						data.masters.data[mastersDataIndex]++;
					}

					// Impression question
					var impressionIndex = temp[i].gsx$whatsyourgeneralimpressionofthecompany.$t;
					var impressionDataIndex = data.impression.labels.indexOf(impressionIndex);
					if(impressionDataIndex < 0) {
						data.impression.labels.push(impressionIndex);
					}
					// New index made
					impressionDataIndex = data.impression.labels.indexOf(impressionIndex);
					if(data.impression.data[impressionDataIndex] === undefined) {
						data.impression.data[impressionDataIndex] = 1;
					} else {
						data.impression.data[impressionDataIndex]++;
					}

					// Knowledge
					var knowledgeIndex = temp[i].gsx$howwelldoyouknowwhatthecompanydoes.$t;
					var knowledgeDataIndex = data.knowledge.labels.indexOf(knowledgeIndex);
					if(knowledgeDataIndex < 0) {
						data.knowledge.labels.push(knowledgeIndex);
					}
					// New index made
					knowledgeDataIndex = data.knowledge.labels.indexOf(knowledgeIndex);
					if(data.knowledge.data[knowledgeDataIndex] === undefined) {
						data.knowledge.data[knowledgeDataIndex] = 1;
					} else {
						data.knowledge.data[knowledgeDataIndex]++;
					}
				}
				$scope.beforeData = data;
				$scope.beforeDataIsSet = true;
			}, function errorCallback(response) {
				console.log(response);
			});
}
});

$scope.$watch('company.eventDataAfterURL', function () {
			//console.log($scope.company.eventDataAfterURL);

			var re = /d\/(.+)\//; 
			var str = $scope.company.eventDataAfterURL;
			var result = re.exec(str);
			var spreadsheetId = null;
			if(result !== null) {
				spreadsheetId = result[0].substring(2); // OBS! Has trailing "/"
			}

			if(spreadsheetId !== null) {
				$http.get("https://spreadsheets.google.com/feeds/list/" + spreadsheetId + "default/public/values?alt=json").then(function(response) {
					console.log(response);
					temp = response.data.feed.entry;
				//console.log(temp);
				var data = {};
				data.masters = {data: [], labels: []};
				data.qualified = {data: [], labels: []};
				data.change = {data: [], labels: []};
				data.knowledge = {data: [], labels: []};
				data.impression = {data: [], labels: []};
				data.words = { word: [], count: [], total: 0 };
				var words = [];
				for (var i = 0; i < temp.length; i++) {
					// Masters thesis question
					var mastersIndex = temp[i].gsx$howlikelyisitthatyouwouldliketowriteyourmastersthesisworkatthiscompany.$t;
					var mastersDataIndex = data.masters.labels.indexOf(mastersIndex);
					if(mastersDataIndex < 0) {
						data.masters.labels.push(mastersIndex);
					}
					// New index made
					mastersDataIndex = data.masters.labels.indexOf(mastersIndex);
					if(data.masters.data[mastersDataIndex] === undefined) {
						data.masters.data[mastersDataIndex] = 1;
					} else {
						data.masters.data[mastersDataIndex]++;
					}

					// Qualified question
					var qualifiedIndex = temp[i].gsx$doyoufeellikeyouarequalifiedtoworkatthiscompany.$t;
					var qualifiedDataIndex = data.qualified.labels.indexOf(qualifiedIndex);
					if(qualifiedDataIndex < 0) {
						data.qualified.labels.push(qualifiedIndex);
					}

					// New index made
					qualifiedDataIndex = data.qualified.labels.indexOf(qualifiedIndex);
					if(data.qualified.data[qualifiedDataIndex] === undefined) {
						data.qualified.data[qualifiedDataIndex] = 1;
					} else {
						data.qualified.data[qualifiedDataIndex]++;
					}

					// Change question
					var changeIndex = temp[i].gsx$isitapositiveoranegativechange.$t;
					var changeDataIndex = data.change.labels.indexOf(changeIndex);
					if(changeDataIndex < 0) {
						data.change.labels.push(changeIndex);
					}
					// New index made
					changeDataIndex = data.change.labels.indexOf(changeIndex);
					if(data.change.data[changeDataIndex] === undefined) {
						data.change.data[changeDataIndex] = 1;
					} else {
						data.change.data[changeDataIndex]++;
					}

					// Knowledge question
					var knowledgeIndex = temp[i].gsx$howwelldoyouknowwhatthecompanydoes.$t;
					var knowledgeDataIndex = data.knowledge.labels.indexOf(knowledgeIndex);
					if(knowledgeDataIndex < 0) {
						data.knowledge.labels.push(knowledgeIndex);
					}
					// New index made
					knowledgeDataIndex = data.knowledge.labels.indexOf(knowledgeIndex);
					if(data.knowledge.data[knowledgeDataIndex] === undefined) {
						data.knowledge.data[knowledgeDataIndex] = 1;
					} else {
						data.knowledge.data[knowledgeDataIndex]++;
					}

					// Impression question
					var impressionIndex = temp[i].gsx$whatsyourgeneralimpressionofthecompany.$t;
					var impressionDataIndex = data.impression.labels.indexOf(impressionIndex);
					if(impressionDataIndex < 0) {
						data.impression.labels.push(impressionIndex);
					}
					// New index made
					impressionDataIndex = data.impression.labels.indexOf(impressionIndex);
					if(data.impression.data[impressionDataIndex] === undefined) {
						data.impression.data[impressionDataIndex] = 1;
					} else {
						data.impression.data[impressionDataIndex]++;
					}

					// Words
					var wordArray = (temp[i].gsx$wordsyouthinkdescribesthecompany.$t).split(",");
					var tempIndex;
					for (var j = 0; j < wordArray.length; j++) {
						wordArray[j] = wordArray[j].trim(); // trim first!
						tempIndex = data.words.word.indexOf(wordArray[j]);
						if(tempIndex < 0) {
							data.words.word.push(wordArray[j]);
							data.words.total++;
						}
						tempIndex = data.words.word.indexOf(wordArray[j]);
						if(data.words.count[tempIndex] === undefined) {
							//data.words.word[tempIndex] = wordArray[j];
							data.words.count[tempIndex] = 1;
						} else {
							data.words.count[tempIndex]++;
						}
					}
				}
				// Loop to calculate size of each word
				for (var k = 0; k < data.words.total; k++) {
					words.push({text: data.words.word[k], weight: (data.words.count[k]/data.words.total)});
				}
				$scope.words = words;
				$scope.afterData = data;
				$scope.afterDataIsSet = true;
			}, function errorCallback(response) {
				console.log(response);
			});
}
});
}]);
})();