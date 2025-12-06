-- Supabase에서 실행할 PostgreSQL 함수
-- 이 함수는 한 줄로 SET count = count + 1을 실행합니다

CREATE OR REPLACE FUNCTION increment_test_count(test_link TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE mindpang_test 
  SET count = count + 1 
  WHERE link = test_link;
END;
$$;

-- 함수 실행 권한 부여 (필요한 경우)
-- GRANT EXECUTE ON FUNCTION increment_test_count(TEXT) TO authenticated;
-- GRANT EXECUTE ON FUNCTION increment_test_count(TEXT) TO anon;

