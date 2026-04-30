# Meal Pricing Feature Documentation

## Overview
The HealthyBite meal pricing system provides budget-aware meal recommendations with dynamic price adjustments based on user preferences.

## Budget Tiers

### 1. Budget (0.8x multiplier)
- **Target**: Cost-conscious users
- **Price Adjustment**: 20% discount on base price
- **Example**: ₹150 base → ₹120 actual
- **Use Case**: Users prioritizing affordability

### 2. Moderate (1.0x multiplier)
- **Target**: Standard users
- **Price Adjustment**: Base price (no adjustment)
- **Example**: ₹150 base → ₹150 actual
- **Use Case**: Users seeking balanced pricing

### 3. Premium (1.3x multiplier)
- **Target**: Premium service users
- **Price Adjustment**: 30% premium
- **Example**: ₹150 base → ₹195 actual
- **Use Case**: Users willing to pay for premium options

## Price Calculation

### Base Price Algorithm
The system calculates base prices based on meal characteristics:

```
Base Price = 150 (default)
+ 80 if protein ≥ 35g (high protein)
+ 50 if protein ≥ 25g (medium protein)
+ 40 if non-vegetarian/pescatarian
+ 30 if calories ≥ 500
+ 15 if calories ≥ 400
+ 60 if premium ingredients detected
```

### Price Range
- Minimum: ₹100
- Maximum: ₹380
- Average: ₹180

## Implementation Details

### Database Schema
- `meals.base_price`: Base price in INR
- `user_profiles.budget`: Budget tier selection
- `meals.estimated_cost`: Cached calculated price

### API Changes
- POST `/api/profile`: Accepts `budget` parameter
- GET `/api/recommendations`: Returns `basePrice` and `actualPrice`

### UI Components
- **Questionnaire**: Budget tier selection interface
- **Recommendations**: Price display on meal cards
- **Dashboard**: Budget-aware pricing summary

## Regional Meal Pricing

Regional meals have preset base prices:
- **Tamil Nadu meals**: ₹100-320
- **Kerala meals**: ₹120-320
- **Karnataka meals**: ₹120-260
- **Andhra Pradesh meals**: ₹100-280
- **Telangana meals**: ₹100-320
- **Punjab meals**: ₹140-320

## Testing

### Unit Tests
- Price calculation accuracy
- Budget tier validation
- Meal filtering with pricing
- Base price generation

### Integration Tests
- End-to-end recommendation with pricing
- API response validation
- UI price display

## Performance Considerations

- Price calculations are lightweight (O(1) per meal)
- Caching strategy for frequently recommended meals
- Database indexing on base_price for queries

## Future Enhancements

1. **Dynamic Pricing**: Adjust prices based on demand/season
2. **Loyalty Discounts**: Additional discounts for returning users
3. **Bulk Pricing**: Price breaks for meal packages
4. **Regional Pricing**: Location-based price adjustments
5. **Subscription Integration**: Bundle meal deals

## Configuration

### Environment Variables
```env
MEAL_PRICING_ENABLED=true
DEFAULT_BUDGET_TIER=moderate
BUDGET_MULTIPLIER_LOW=0.8
BUDGET_MULTIPLIER_MID=1.0
BUDGET_MULTIPLIER_HIGH=1.3
```

## API Response Example

```json
{
  "id": 101,
  "name": "Sambar Rice",
  "calories": 380,
  "protein": 14,
  "basePrice": 150,
  "actualPrice": 120,
  "budget": "budget"
}
```

## Error Handling

- Invalid budget tier defaults to "moderate"
- Missing base price returns estimated value
- Negative prices are rejected
- Pricing calculations maintain data integrity
