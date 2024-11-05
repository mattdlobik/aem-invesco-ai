/*
  Enables functionality of the [Monthly / Quarterly] and [NAV / (Market/Load) ] toggles on some performance pages
  Ported from dist/assets - to be decommissioned/replaced by Alpine/vanillaJS in a future story
 */
$(window).load(function() {
	function showPerformance(performanceUrl) {
		var monthQuarterToggle = $('#monthQuarterToggle');
		var monthQuarterVal = $('li[class="active"]', monthQuarterToggle).attr('id');
		var classVal = $('input:checked', '#navLoadToggle').val();
		var params = {'period': monthQuarterVal, 'performanceType': classVal};
		var form = $('.usp_filter form');
		var uspFilterAction = form ? form.prop('action') : "";
		var navInput = $('.navinput');
		var uspNavInputSelect = navInput ? navInput.attr('data-nav-filter-input-url') : '';
		var paramName = 'FilterList=';
		var paramExp = new RegExp('^' + paramName);
		var paramFilter = function(param){     
			return param !== paramName && paramExp.test(param);
		};

		if (uspFilterAction) {
			var uspFilterActionParams = uspFilterAction.split('?')[1].split('&');
			var filterListParam = uspFilterActionParams.filter(paramFilter);
			var uspFilterSelected = form.find('select');
			var uspFilterSelectedVal = uspFilterSelected ? uspFilterSelected.val() : '';
			
			params.FilterList = uspFilterSelectedVal;

			if(filterListParam.length > 0) {
				params.FilterList += ':::' + decodeURIComponent(filterListParam[0].split('=')[1]);
			}
		}
		else if (uspNavInputSelect)  {
			var filterListParams = uspNavInputSelect.split('?')[1].split('&');
			var filterList = filterListParams.filter(paramFilter);

			if(filterList.length > 0) {
				params.FilterList = decodeURIComponent(filterList[0].split('=')[1]);              
			}
		}

		$.post(performanceUrl, params, function(data) {
			var html = $($.parseHTML(data)).find('#performanceTable');
			var children = html.find('tbody');
			var asOfDate = html.find('span.performance-asofdate');
			
			var table = $('#performanceTable');
			var tableSticky = $('#performanceTable-sticky');
			
			table.find('tbody').remove();
			table.append(children);
			table.find('span.performance-asofdate').html(asOfDate.html());
			tableSticky.find('span.performance-asofdate').html(asOfDate.html());
			
			var resort = true; // suggested by Sergio Garcia to fix sorting after AJAX
			table.trigger("update", [resort]);
			
			$('input[value="' + classVal + '"]', '#navLoadToggle').prop('checked', true);
		});
	}
	
	performanceLib = function(performanceUrl) {	
		$('#navLoadToggle').find('input[type="radio"]').on('click', (function() {
			showPerformance(performanceUrl);
		}));
		
		var monthQuarterToggle = $('#monthQuarterToggle');
		
		monthQuarterToggle.find('li a').click(function(e) {
			monthQuarterToggle.find('li').removeClass('active');
			
			$(this).parent().addClass('active').attr('id');
								
			showPerformance(performanceUrl);
			
			e.preventDefault();
		});
	
		$('#viewNav').prop('checked', 'checked');
	};
	
	var performanceUrl = $('#monthQuarterToggle').attr('data-performance-url');

	if (performanceUrl && performanceUrl.length > 0) {
		new performanceLib(performanceUrl);
	}

});