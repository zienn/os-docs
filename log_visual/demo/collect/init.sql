
-- 统计log
drop table if exists log;
create table log(
	ip varchar(400),
	url varchar(200),
	status int,
	value int
);


-- 带时间戳log
drop table if exists log_time;
create table log_time(
	status int,
	time int,
	value int
);

-- 经纬度log
drop table if exists log_map;

create table log_map(
	ip varchar(200),
	status int,
	geox varchar(200),
	geoy varchar(200),
	value int
);