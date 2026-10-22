{-# OPTIONS --safe --guardedness --no-postfix-projections --exact-split #-}

module ZH1Proba where

open import Lib

-- Saját PRÓBA-ZH a típuselmélet 1. ZH-jához (a ZH1 feladattípusai szerint)
-- Σ 35 pont, 120 perc. Mérd az időt!
-- Megoldás: ZH1ProbaMegoldas.agda (csak ha már te is végigcsináltad!)

-- Tesztek: a feladatok utáni {- -} blokkokat vedd ki a kommentből, amikor kész vagy
-- (C-c C-l). Ha minden zöld/fehér, nincs sárga és piros, a feladat jó.
-- Ha egy feladattal elakadsz, hagyd {!!}-ben, és lépj tovább!

----------------------
-- 1. FELADAT (3 pont)
-- Ha a kimondott ↔ típus nem teljesen helyes, a 3 pontból nem jár semmi.
----------------------
-- Definiálj izomorfizmust weirdEquiv₁ névvel minden A, B típusra az alábbi típusok között:
-- ⊥ ⊎ A × ⊤ → B ⊎ B × ⊥
-- A → B
-- (Figyelj a precedenciára: ⊎ infixr 1, × infixr 2, a → a leggyengébb!)



----------------------
-- 2. FELADAT (4 pont)
-- Ha a kimondott ↔ típus nem teljesen helyes, a 4 pontból nem jár semmi.
----------------------
-- Definiálj izomorfizmust weirdEquiv₂ névvel az alábbi típusok között:
-- Maybe Bool × Bool
-- Bool ⊎ Bool × Bool



{-
module Feladat-2-Tesztek where
  -- A felső típus (Maybe Bool × Bool) legyen a ↔ bal oldalán!
  f = fst weirdEquiv₂
  g = snd weirdEquiv₂
  _ : g (f (nothing , true)) ≡ (nothing , true)
  _ = refl
  _ : g (f (nothing , false)) ≡ (nothing , false)
  _ = refl
  _ : g (f (just true , false)) ≡ (just true , false)
  _ = refl
  _ : g (f (just false , true)) ≡ (just false , true)
  _ = refl
  _ : f (g (inl true)) ≡ inl true
  _ = refl
  _ : f (g (inr (false , true))) ≡ inr (false , true)
  _ = refl
  _ : f (g (inr (true , true))) ≡ inr (true , true)
  _ = refl
-}

----------------------------
-- 3. FELADAT (0.5 + 2 + 2 pont)
----------------------------
-- a) Definiáld a tri függvényt, amely kiszámolja a 0 + 1 + ... + n összeget!
--    CSAK a rec-ℕ rekurzort használhatod (mintaillesztés és rekurzív hívás nélkül),
--    illetve az _+_ műveletet.
--    Emlékeztető: rec-ℕ : ℕ → A → (ℕ → A → A) → A
-- b) Definiáld a div3 függvényt (⌊n/3⌋), CSAK mintaillesztéssel, konstruktorokkal és
--    rekurzív hívással (semmilyen más függvény nem használható)!



{-
module Feladat-3-Tesztek where
  _ : tri 0 ≡ 0
  _ = refl
  _ : tri 1 ≡ 1
  _ = refl
  _ : tri 4 ≡ 10
  _ = refl
  _ : tri 10 ≡ 55
  _ = refl
  _ : div3 0 ≡ 0
  _ = refl
  _ : div3 2 ≡ 0
  _ = refl
  _ : div3 3 ≡ 1
  _ = refl
  _ : div3 20 ≡ 6
  _ = refl
-}

--------------------------
-- 4. FELADAT (1 + 4 pont)
-- Ha a feladat típusa nem teljesen helyes, a 4 pontból nem jár semmi.
--------------------------
-- Definiáld a runLength függvényt (futáshossz-kódolás), amely egy listában az egymást
-- követő egyenlő elemeket (elem , darabszám) párokká tömöríti!
-- Egyenlőségvizsgálatra az _==_ függvényt lehet használni; a típus legyen ad-hoc polimorf!
-- Pl. runLength (1 ∷ 1 ∷ 2 ∷ 3 ∷ 3 ∷ 3 ∷ 1 ∷ []) ≡ (1 , 2) ∷ (2 , 1) ∷ (3 , 3) ∷ (1 , 1) ∷ []



{-
module Feladat-4-Tesztek where
  _ : runLength {ℕ} [] ≡ []
  _ = refl
  _ : runLength {ℕ} (7 ∷ []) ≡ (7 , 1) ∷ []
  _ = refl
  _ : runLength {ℕ} (1 ∷ 1 ∷ 2 ∷ 3 ∷ 3 ∷ 3 ∷ 1 ∷ []) ≡ (1 , 2) ∷ (2 , 1) ∷ (3 , 3) ∷ (1 , 1) ∷ []
  _ = refl
  _ : runLength (true ∷ true ∷ false ∷ []) ≡ (true , 2) ∷ (false , 1) ∷ []
  _ = refl
-}

-------------------------
-- 5. a) FELADAT (2 pont)
-------------------------
-- Definiálj datával egy Expr típust aritmetikai kifejezésekre! Konstruktorok:
-- ∙ lit    : természetes szám literál
-- ∙ _:+_   : két kifejezés összege      (infixl 6)
-- ∙ _:*_   : két kifejezés szorzata     (infixl 7)
-- ∙ ifZero : három kifejezés; ha az első értéke 0, a második, különben a harmadik az érték



-----------------------------
-- 5. b) FELADAT (1 + 3.5 pont)
-----------------------------
-- Definiáld az eval : Expr → ℕ kiértékelő függvényt!



{-
module Feladat-5-Tesztek where
  _ : eval (lit 3 :+ lit 4 :* lit 5) ≡ 23
  _ = refl
  _ : eval ((lit 3 :+ lit 4) :* lit 5) ≡ 35
  _ = refl
  _ : eval (ifZero (lit 0) (lit 1) (lit 2)) ≡ 1
  _ = refl
  _ : eval (ifZero (lit 2 :* lit 0 :+ lit 1) (lit 1) (lit 2 :+ lit 2)) ≡ 4
  _ = refl
-}

--------------------------
-- 6. FELADAT (1 + 4 pont)
--------------------------
-- a) Definiáld az interleave függvényt, amely két tetszőleges (de azonos) típusú Stream
--    elemeit felváltva fésüli össze, az elsővel kezdve!
-- b) Definiáld az everyOther függvényt, amely egy Stream 0., 2., 4., ... elemét tartja meg!



{-
module Feladat-6-Tesztek where
  _ : Stream.List.take 6 (interleave Stream.[0-∞] (Stream.repeat 100)) ≡ 0 ∷ 100 ∷ 1 ∷ 100 ∷ 2 ∷ 100 ∷ []
  _ = refl
  _ : Stream.List.take 5 (everyOther Stream.[0-∞]) ≡ 0 ∷ 2 ∷ 4 ∷ 6 ∷ 8 ∷ []
  _ = refl
  _ : Stream.List.take 4 (everyOther (tail (interleave (Stream.repeat 7) Stream.[ 5 …]))) ≡ 5 ∷ 6 ∷ 7 ∷ 8 ∷ []
  _ = refl
-}

--------------------------------
-- 7. FELADAT (2 + 0.5 + 4.5 pont)
-- Ha a record vagy a stackMachine típusa nem teljesen helyes, a 4.5 pontból nem jár semmi.
--------------------------------
-- Definiálj egy koinduktív veremgépet StackMachine névvel és hozzá egy stackMachine
-- függvényt, amely a verem kezdeti tartalmát (List ℕ, a lista eleje a verem teteje) kapja:
-- ∙ top  : el lehet kérni a verem tetején lévő számot (üres veremnél nothing)
-- ∙ size : el lehet kérni a verem méretét
-- ∙ push : egy számot a verem tetejére lehet tenni
-- ∙ pop  : a legfelső elemet el lehet dobni (üres veremnél nem történik semmi)
-- ∙ add  : a felső két elemet leveszi és az összegüket teszi vissza
--          (ha nincs legalább két elem, nem történik semmi)



{-
module Feladat-7-Tesztek where
  open StackMachine
  s0 = stackMachine []
  s1 = push s0 3
  s2 = push s1 4
  s3 = push s2 10
  s4 = add s3
  s5 = add s4
  s6 = add s5
  s7 = pop s6
  s8 = pop s7
  _ : top s0 ≡ nothing
  _ = refl
  _ : size s3 ≡ 3
  _ = refl
  _ : top s3 ≡ just 10
  _ = refl
  _ : top s4 ≡ just 14
  _ = refl
  _ : size s4 ≡ 2
  _ = refl
  _ : top s5 ≡ just 17
  _ = refl
  _ : top s6 ≡ just 17
  _ = refl
  _ : size s7 ≡ 0
  _ = refl
  _ : top s8 ≡ nothing
  _ = refl
-}
