package com.training.paging;

import org.hibernate.engine.spi.ExecutableList.Sorter;

public class PageRequest {
	private Integer page;
	private Integer maxPageItem;
	private Sorter sorter;
}
